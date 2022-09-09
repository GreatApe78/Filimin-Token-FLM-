

const Filimin = artifacts.require("Filimin");



module.exports =  async (deployer,network,accounts)=>{

    await deployer.deploy(Filimin);

    const contrato = await Filimin.deployed();
    





}