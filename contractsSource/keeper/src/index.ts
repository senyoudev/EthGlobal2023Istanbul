import * as snarkjs from "snarkjs"
import { ethers } from "ethers"
import { buildMimcSponge } from 'circomlibjs'
import fs from "fs";

const address = "0x000000000"
const proposalId = 0;

const WasmPath = "../build/Verifier_js/Verifier.wasm"
const ZKeyPath = "../keys/myCustomKey.zkey"
const VerificationPath = "../keys/myCustomVerificationKey.json"



const expectedResult = async (vote : number,proposalId:number,address: string)  =>  {
	const mimc = await buildMimcSponge();
	const hash = mimc.F.toString(mimc.multiHash([vote, proposalId,address],undefined,1));
	return hash;
}



const generateProof = async () => {
	
	console.log("start")
	// params start
	const vote  =  0;

	// params end
	const { proof, publicSignals } = await snarkjs.groth16.fullProve(
		{ vote, proposalId, address },
		WasmPath,
		ZKeyPath);
	console.log("Calculating local hash")
	const hash =  await  expectedResult(vote,proposalId,address);
	console.log(`Local hash is ${hash}`)
	console.log(`Circuit  output ${publicSignals}`)
	return {proof,publicSignals}
}


const _verify  = async (proof : snarkjs.Groth16Proof  ,  expected : snarkjs.PublicSignals) => {
	const vKey = JSON.parse(fs.readFileSync(VerificationPath).toString());
	const res = await snarkjs.groth16.verify(vKey, expected, proof);
	if (res === true) {
	console.log("Verification OK");
	return true;
	} else {
	console.log("Invalid proof");
	return false;
	}
}

const verifyProof = async () => {
	const {proof,publicSignals} = await generateProof();
	console.log("now verifying");
	const expectedOutput = await expectedResult(0,proposalId,address);
	const r = await  _verify(proof,[expectedOutput]);
}


verifyProof().catch(e  => {
	console.log("Something failed");
	console.log(e)
}).then(() => console.log("Success done"))

/* generateProof().catch(e => {
	console.log("Failed Running script")
	console.log(e)
}).then(() => console.log("hello world")) */
