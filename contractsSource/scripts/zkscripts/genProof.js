import snarkjs from "snarkjs"



const generateProof = async () => {
	const { proof, publicSignals } = await snarkjs.groth16.fullProve(
		{ in: 10 },
		"../../build/Verifier_js/Verifier.wasm",
		"../../keys/verifier_0000.zkey");
	console.log(publicSignals);
	console.log(proof);
}