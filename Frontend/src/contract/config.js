const dotenv = require("dotenv");

dotenv.config();

const config = {
    parcelforce: {
        56: '0x4978e2C2e1d3d797269c05F343BB7d0cECF935C6',
        97: '',
    },
    BlockExplorerURL: {
        56: "https://bscscan.com",
        97: "https://testnet.bscscan.com",
    },
    RpcURL: {
        wss: {
            1: "wss://mainnet.infura.io/ws/v3/9254bae6432742babcfc7d367c7e77cd",
        },
        https: {
            56: "https://bsc-dataseed1.defibit.io/",
            97: "https://speedy-nodes-nyc.moralis.io/03eb35954a0b7ed092444a8e/bsc/testnet",
        },
    },
    chainHexID: {
        56: "0x38",
        97: "0x61",
    },
    INFURA_ID: process.env.INFURA_ID,
    chainID: 56,
    privateKey: process.env.PRIVATE_KEY,
};

export default config;
