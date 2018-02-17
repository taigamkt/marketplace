var Migrations = artifacts.require("./Migrations.sol");

var FungibleAssetStore = artifacts.require("./FungibleAssetStore.sol");


module.exports = async function(deployer, network, accounts) {
  //console.log(accounts);
  let storeName = "Aliens Invasion";
  let storeUrl = "https://github.com/cykod/AlienInvasion.git";

  let owner = accounts[9];
  let firstPlayer = accounts[0];
  let secondPlayer = accounts[1];
  await Promise.all([
    deployer.deploy(Migrations),
    deployer.deploy(FungibleAssetStore, storeName, storeUrl, {from: owner})
  ]);

  instances = await Promise.all([
    FungibleAssetStore.deployed()
  ])

  let store = instances[0];

  //console.log(store);
  results = await Promise.all([
    store.createAssetType("Spaceship 1", "Spaceship 1 description", "imageUrl", "gamming", 100, {from: owner}),
    store.createAssetType("Spaceship 2", "Spaceship 2 description", "imageUrl", "gamming", 100, {from: owner}),
    store.createAssetType("Spaceship 3", "Spaceship 3 description", "imageUrl", "gamming", 100, {from: owner}),
    store.transfer(firstPlayer, 0, {from: owner}),
    store.transfer(firstPlayer, 100, {from: owner}),
    store.transfer(firstPlayer, 200, {from: owner}),
    store.transfer(secondPlayer, 1, {from: owner}),
    store.transfer(secondPlayer, 201, {from: owner})

  ]);


  const addr = await store.address;
  const ownerContract = await store.owner.call();
  console.log('AlienInvasion Smart Contract Address: '+addr);
  console.log('AlienInvasion Smart Contract Owner: '+ownerContract);


  /*results = await Promise.all([
    factory.setAssetTypesRegistry(registry.address)
  ]);

  const addr = await factory.assetTypesRegistry.call();

  console.log('addr: '+addr);*/
};
