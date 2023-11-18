import hardhat from "hardhat";
const { ethers } = hardhat;
import { buildMimcSponge, mimcSpongecontract } from 'circomlibjs'
import { expect } from "chai"

const SEED = "mimcsponge"

const deployHasher = async () => {
	const signers = await ethers.getSigners()
	let mimc = await buildMimcSponge();
	const MiMCSponge = new ethers.ContractFactory(
		mimcSpongecontract.abi,
		mimcSpongecontract.createCode(SEED, 220),
		signers[0]
	)
	let mimcsponge = await MiMCSponge.deploy()
	console.log(`Sponge contract deployed on ${mimcsponge.target}`);
	return [mimc, mimcsponge]
}

const deployVerifier = async () => {
	const Verifier = await ethers.getContractFactory("Verifier");
	const verifier = await Verifier.deploy();
	console.log(`Verifier Address ${verifier.target}`);
	return verifier;
}


describe("Test hashing", () => {
	let mimc;
	let mimcsponge;
	let verifier;
	before("Setting up the hasher", async () => {
		[mimc, mimcsponge] = await deployHasher();
		verifier = await deployVerifier();
	})
	it("Should deploy and generate a mimc hash", async () => {


		const res = await mimcsponge["MiMCSponge"](1, 2, 3);
		const res2 = mimc.hash(1, 2, 3);
		console.log(`Res : ${res}`);
		console.log(`Res2 : [${mimc.F.toString(res2.xL)} , ${mimc.F.toString(res2.xR)}]`)
		expect(res[0].toString()).to.be.eq(mimc.F.toString(res2.xL));
		expect(res[1].toString()).to.be.eq(mimc.F.toString(res2.xR));
	})
})