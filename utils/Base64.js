export default class Base64 {
    static encode (text){
        let bufferObj = Buffer.from(text, "utf8");
        let base64String = bufferObj.toString("base64");
        return base64String;
    }

    static decode (text){
        let bufferObj = Buffer.from(text, "base64");
        let decodedString = bufferObj.toString("utf8");
        return decodedString;
    }
}
