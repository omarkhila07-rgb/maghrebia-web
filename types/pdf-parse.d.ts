declare module 'pdf-parse' {
  interface PDFParseResult {
    text: string;
    numpages: number;
    info?: any;
    metadata?: any;
    version?: string;
  }
  function pdf(
    data: Buffer | Uint8Array | ArrayBuffer,
    options?: any
  ): Promise<PDFParseResult>;
  export default pdf;
}
