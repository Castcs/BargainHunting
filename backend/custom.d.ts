// custom.d.ts
declare namespace Express {
    export interface Request {
        container: Container; // Assuming 'container' is the name of the property
    }
}
