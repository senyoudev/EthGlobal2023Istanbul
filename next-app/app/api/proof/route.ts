import * as snarkjs from "snarkjs"
interface  ReqBody {
	address : string;
	vote : number;
	proposalId :number
}

const WasmPath = "./zk/Verifier.wasm"
const ZKeyPath = "./zk/myCustomKey.zkey"

export async function POST(request: Request) {
	try{
		const data : ReqBody  = await request.json()
	const vote = data.vote;
	const proposalId = data.proposalId;
	const address = data.address;
	console.log("generating proof")
	const { proof, publicSignals } = await snarkjs.groth16.fullProve(
		{vote,proposalId,address},
		WasmPath,
		ZKeyPath);	

	console.log("returning proof")
	return Response.json({failed : false,proof})
	}catch (e) {
		console.log(e)
		return Response.json({failed : true})
	}
}