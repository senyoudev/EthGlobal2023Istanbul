import * as snarkjs from "snarkjs"
import { ethers } from "ethers"
import { buildMimcSponge } from 'circomlibjs'


const address = "0x000000000"
const proposalId = 0;

const WasmPath = "../build/Verifier_js/Verifier.wasm"
const ZKeyPath = "../keys/myCustomKey.zkey"



const generateProof = async () => {
	const mimc = await buildMimcSponge();
	console.log("start")
	// params start
	const vote  =  0;
	const proposalId = 0;
	const  address = "0x000000";
	// params end
	const { proof, publicSignals } = await snarkjs.groth16.fullProve(
		{ vote, proposalId, address },
		WasmPath,
		ZKeyPath);
	console.log("Calculating local hash")
	const hash = mimc.F.toString(mimc.multiHash([vote, proposalId,address],undefined,1));
	console.log(`Local hash is ${hash}`)
	console.log(`Circuit  output ${publicSignals}`)
	return {proof,publicSignals}
}


const verifyProof = async () => {

}


generateProof().catch(e => {
	console.log("Failed Running script")
	console.log(e)
}).then(() => console.log("hello world"))
