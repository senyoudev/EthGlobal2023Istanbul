import * as snarkjs from "snarkjs"
import * as ethers from "ethers";



const address = "0x000000000"
const proposalId = 0;

const generateProof = async () => {
	console.log("start")
	// params start
	const vote = 0 // 0 => Yes / 1 => No
	const commitment = ethers.keccak256(ethers.toUtf8Bytes("hello world"))
	console.log(`The hash is ${commitment}`)
	const pathElems = [0].concat((new Array(69)).fill(0));
	const Indices = [0].concat((new Array(69)).fill(0));
	// params end
	const { proof, publicSignals } = await snarkjs.groth16.fullProve(
		{ vote, commitment, pathElements: pathElems, pathIndices: Indices },
		"./build/Verifier_js/Verifier.wasm",
		"./keys/verifier_0000.zkey");
	console.log(publicSignals)

}

console.log("here")

generateProof().catch(e => {
	console.log("Failed Running script")
	console.log(e)
})