var solc = require('solc');
var fs = require('fs');

const SOL_PATH = __dirname + '/../assess/'

const input = {
    'userRegistry.sol': fs.readFileSync(SOL_PATH + "userRegistry.sol").toString(),
    'user.sol': fs.readFileSync(SOL_PATH + "user.sol").toString(),
    'concept.sol': fs.readFileSync(SOL_PATH + "concept.sol").toString(),
    'conceptRegistry.sol': fs.readFileSync(SOL_PATH + "conceptRegistry.sol").toString(),
    'assessment.sol': fs.readFileSync(SOL_PATH + "assessment.sol").toString(),
    'math.sol': fs.readFileSync(SOL_PATH + "math.sol").toString()
  }

const output = solc.compile({ sources: input }, 1)
if (output.errors) { throw new Error(output.errors); console.log('arggg') }

//console.log(output)
const UserRegistryABI = JSON.parse(output.contracts['userRegistry.sol:UserRegistry'].interface)
const UserRegistryByteCode = output.contracts['userRegistry.sol:UserRegistry'].bytecode

const ConceptRegistryABI = JSON.parse(output.contracts['conceptRegistry.sol:ConceptRegistry'].interface)
const ConceptRegistryByteCode = output.contracts['conceptRegistry.sol:ConceptRegistry'].bytecode

fs.writeFileSync('bin/ConceptRegistryABI', JSON.stringify(ConceptRegistryABI))
fs.writeFileSync('bin/ConceptRegistryByteCode', ConceptRegistryByteCode)

fs.writeFileSync('bin/UserRegistryABI', JSON.stringify(UserRegistryABI))
fs.writeFileSync('bin/UserRegistryByteCode', UserRegistryByteCode)
