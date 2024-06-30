/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
    "/v6.0/1/quote": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Find the best quote to swap with 1inch Router */
        get: operations["AggregationController_getQuote"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v6.0/1/swap": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Generate calldata to swap on 1inch Router */
        get: operations["AggregationController_getSwap"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v6.0/1/approve/spender": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Address of the 1inch Router that is trusted to spend funds for the swap */
        get: operations["ApproveController_getSpender"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v6.0/1/approve/transaction": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Generate approve calldata to allow 1inch Router to perform a swap */
        get: operations["ApproveController_getCallData"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v6.0/1/approve/allowance": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get the number of tokens that the 1inch Router is allowed to swap */
        get: operations["ApproveController_getAllowance"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v6.0/1/liquidity-sources": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List of liquidity sources that are available for routing in the 1inch Aggregation Protocol */
        get: operations["ProtocolsController_getProtocolsImages"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v6.0/1/tokens": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List of tokens that are available for swap in the 1inch Aggregation protocol */
        get: operations["TokensController_getTokens"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        TokenInfo: {
            /** @example 0x111111111117dc0aa78b770fa6a738034120c302 */
            address: string;
            /** @example 1INCH */
            symbol: string;
            /** @example 1INCH Token */
            name: string;
            /** @example 18 */
            decimals: number;
            /** @example https://tokens.1inch.io/0x111111111117dc0aa78b770fa6a738034120c302.png */
            logoURI: string;
            domainVersion?: string;
            /** @example true */
            eip2612?: boolean;
            /** @example false */
            isFoT?: boolean;
            /** @example [
             *       "tokens"
             *     ] */
            tags?: string[];
        };
        QuoteResponse: {
            /** @description Source token info */
            srcToken?: components["schemas"]["TokenInfo"];
            /** @description Destination token info */
            dstToken?: components["schemas"]["TokenInfo"];
            /**
             * @description Expected amount of destination token
             * @example 62131879850006790961
             */
            dstAmount: string;
            /** @description Selected protocols in a path */
            protocols?: components["schemas"]["SelectedProtocol"][][][];
            /**
             * @description Estimated gas
             * @example 100000
             */
            gas?: number;
        };
        HttpExceptionMeta: {
            type: string;
            value: string;
        };
        QuoteRequestError: {
            /**
             * @description Error code description
             * @example Bad Request
             */
            error: string;
            /**
             * @description Error description
             * @example insufficient liquidity
             */
            description: string;
            /**
             * @description HTTP code
             * @example 400
             * @enum {number}
             */
            statusCode: 400 | 500;
            /**
             * @description Request id
             * @example 2a92c18a-5c20-4f0d-a0da-e8b5b3602ad6
             */
            requestId: string;
            /** @description Meta information */
            meta: components["schemas"]["HttpExceptionMeta"][];
        };
        TransactionData: {
            /** @example 0x1111111111111111111111111111111111111111 */
            from: string;
            /** @example 0x1111111254eeb25477b68fb85ed929f73a960582 */
            to: string;
            /** @example 0x0502b1c50000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002386f26fc10000000000000000000000000000000000000000000000000003556e53186804ca3e0000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000000180000000000000003b6d034026aad2da94c59524ac0d93f6d6cbf9071d7086f2 */
            data: string;
            /** @example 10000000000000000 */
            value: string;
            /** @example 6994090150 */
            gasPrice: string;
            /** @example 121363 */
            gas: number;
        };
        SwapResponse: {
            /** @description Source token info */
            srcToken?: components["schemas"]["TokenInfo"];
            /** @description Destination token info */
            dstToken?: components["schemas"]["TokenInfo"];
            /**
             * @description Expected amount of destination token
             * @example 62131879850006790961
             */
            dstAmount: string;
            /** @description Selected protocols in a path */
            protocols?: components["schemas"]["SelectedProtocol"][][][];
            /** @description Transaction object */
            tx: components["schemas"]["TransactionData"];
        };
        SwapRequestError: {
            /**
             * @description Error code description
             * @example Bad Request
             */
            error: string;
            /**
             * @description Error description
             * @example cannot estimate
             */
            description: string;
            /**
             * @description HTTP code
             * @example 400
             * @enum {number}
             */
            statusCode: 400 | 500;
            /**
             * @description Request id
             * @example 2a92c18a-5c20-4f0d-a0da-e8b5b3602ad6
             */
            requestId: string;
            /** @description Meta information */
            meta: components["schemas"]["HttpExceptionMeta"][];
        };
        SpenderResponse: {
            /**
             * @description Address of the 1inch Router that is trusted to spend funds for the swap
             * @example 0x1111111254eeb25477b68fb85ed929f73a960582
             */
            address: string;
        };
        ApproveCallDataResponse: {
            /**
             * @description The encoded data to call the approve method on the swapped token contract
             * @example 0x095ea7b30000000000000000000000001111111254eeb25477b68fb85ed929f73a960582ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
             */
            data: string;
            /**
             * @description Network high gas price in wei
             * @example 1000000000
             */
            gasPrice: string;
            /**
             * @description Token address that will be allowed to exchange through 1inch Router
             * @example 0x111111111117dc0aa78b770fa6a738034120c302
             */
            to: string;
            /**
             * @description Native token value in wei (for approve is always 0)
             * @example 0
             */
            value: string;
        };
        AllowanceResponse: {
            /**
             * @description Allowance amount
             * @example 115792089237316195423570985008687907853269984665640564039457584007913129639935
             */
            allowance: string;
        };
        ProtocolImage: {
            /** @description Protocol id */
            id: string;
            /** @description Protocol title */
            title: string;
            /** @description Protocol logo image */
            img: string;
            /** @description Protocol logo image in color */
            img_color: string;
        };
        ProtocolsResponse: {
            /** @description List of protocols that are available for routing in the 1inch Aggregation Protocol */
            protocols: components["schemas"]["ProtocolImage"][];
        };
        SelectedProtocol: {
            /**
             * @description Protocol id
             * @example UNISWAP_V3
             */
            name: string;
            /**
             * @description Protocol share
             * @example 100
             */
            part: number;
            /**
             * @description Source token to swap on protocol
             * @example 0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
             */
            fromTokenAddress: string;
            /**
             * @description Destination token to swap on protocol
             * @example 0x111111111117dc0aa78b770fa6a738034120c302
             */
            toTokenAddress: string;
        };
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    AggregationController_getQuote: {
        parameters: {
            query: {
                /** @example 0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee */
                src: string;
                /** @example 0x111111111117dc0aa78b770fa6a738034120c302 */
                dst: string;
                /** @example 10000000000000000 */
                amount: string;
                /** @description All supported liquidity sources by default */
                protocols?: string;
                /** @description Partner fee. min: 0; max: 3 Should be the same for /quote and /swap */
                fee?: number;
                /** @description Network price per gas in wei. By default fast network gas price */
                gasPrice?: string;
                complexityLevel?: number;
                parts?: number;
                mainRouteParts?: number;
                gasLimit?: number;
                /** @description Return fromToken and toToken info in response */
                includeTokensInfo?: boolean;
                /** @description Return used swap protocols in response */
                includeProtocols?: boolean;
                /** @description Return approximated gas in response */
                includeGas?: boolean;
                connectorTokens?: string;
                /** @description excluded supported liquidity sources */
                excludedProtocols?: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["QuoteResponse"];
                };
            };
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["QuoteRequestError"];
                };
            };
        };
    };
    AggregationController_getSwap: {
        parameters: {
            query: {
                /** @example 0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee */
                src: string;
                /** @example 0x111111111117dc0aa78b770fa6a738034120c302 */
                dst: string;
                /** @example 10000000000000000 */
                amount: string;
                /** @description The address that calls the 1inch contract */
                from: string;
                /** @description An EOA address that initiate the transaction */
                origin: string;
                /**
                 * @description min: 0; max: 50
                 * @example 1
                 */
                slippage: number;
                /** @description All supported liquidity sources by default */
                protocols?: string;
                /** @description Partner fee. min: 0; max: 3 Should be the same for /quote and /swap */
                fee?: number;
                /** @description Network price per gas in wei. By default fast network gas price */
                gasPrice?: string;
                complexityLevel?: number;
                parts?: number;
                mainRouteParts?: number;
                gasLimit?: number;
                /** @description Return fromToken and toToken info in response */
                includeTokensInfo?: boolean;
                /** @description Return used swap protocols in response */
                includeProtocols?: boolean;
                /** @description Return approximated gas in response */
                includeGas?: boolean;
                connectorTokens?: string;
                /** @description excluded supported liquidity sources */
                excludedProtocols?: string;
                /** @description https://eips.ethereum.org/EIPS/eip-2612 */
                permit?: string;
                /** @description This address will receive funds after the swap. By default same address as "from" param */
                receiver?: string;
                referrer?: string;
                /** @description By default set to false */
                allowPartialFill?: boolean;
                /** @description Enable this flag to disable onchain simulation */
                disableEstimate?: boolean;
                /** @description Enable this flag in case you did an approval to permit2 smart contract */
                usePermit2?: boolean;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["SwapResponse"];
                };
            };
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["SwapRequestError"];
                };
            };
        };
    };
    ApproveController_getSpender: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["SpenderResponse"];
                };
            };
        };
    };
    ApproveController_getCallData: {
        parameters: {
            query: {
                /**
                 * @description Token address you want to swap
                 * @example 0x111111111117dc0aa78b770fa6a738034120c302
                 */
                tokenAddress: string;
                /**
                 * @description The number of tokens that the 1inch Router is allowed to swap.If not specified, it will be allowed to spend an infinite amount of tokens.
                 * @example 100000000000
                 */
                amount?: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Transaction body to allow the exchange with the 1inch Router */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ApproveCallDataResponse"];
                };
            };
        };
    };
    ApproveController_getAllowance: {
        parameters: {
            query: {
                /**
                 * @description Token address you want to swap
                 * @example 0x111111111117dc0aa78b770fa6a738034120c302
                 */
                tokenAddress: string;
                /** @description Wallet address for which you want to check */
                walletAddress: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AllowanceResponse"];
                };
            };
        };
    };
    ProtocolsController_getProtocolsImages: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ProtocolsResponse"];
                };
            };
        };
    };
    TokensController_getTokens: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description All supported tokens (can also use your own) */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        tokens?: {
                            "0x111111111117dc0aa78b770fa6a738034120c302"?: components["schemas"]["TokenInfo"];
                        };
                    };
                };
            };
        };
    };
}