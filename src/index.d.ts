import type {Ethereum} from 'ethers'

// global.d.ts
declare global {
    interface Window {
        ethereum: any;
    }
}

export { };