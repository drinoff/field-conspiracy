export default function RandomIDGen() {
    let r = (Math.random() + 1).toString(36).substring(2);
    return r;
}
