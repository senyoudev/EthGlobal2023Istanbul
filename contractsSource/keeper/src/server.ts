import express from "express"
import * as snarkjs from "snarkjs"
import { customPublic } from "./keys";
import { encryptData } from "./generator";

interface  ReqBody {
	address : string;
	vote : number;
	proposalId :number
}

const WasmPath = "../build/Verifier_js/Verifier.wasm"
const ZKeyPath = "../keys/myCustomKey.zkey"
const VerificationPath = "../keys/myCustomVerificationKey.json"


const app = express ();
app.use(express.json());


const PORT = process.env.PORT || 3030;


app.post("/proof",async (req,res) => {
	try{
	const data : ReqBody  = await req.body;
		
	const vote = data.vote;
	const proposalId = data.proposalId;
	const address = data.address;
	console.log("generating proof")
	const { proof, publicSignals } = await snarkjs.groth16.fullProve(
		{vote,proposalId,address},
		WasmPath,
		ZKeyPath);	

	console.log("returning proof")
	const encrypted =  encryptData(String(proposalId),customPublic);
	return res.json({failed : false,proof,key:encrypted})
	}catch (e) {
		console.log(e)
		return res.json({failed : true})
	}
}) 


app.listen(PORT, () => {
	console.log("Server Listening on PORT:", PORT);
  });