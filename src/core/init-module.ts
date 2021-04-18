const r = require('require-context')
const path = require('path')


export default function initModule(){
    const defpath=path.join(__dirname,'../modules');
    const requireDir = r(defpath, true, 'index.ts')
    return requireDir.keys().reduce((acc:any[],fileName:string)=>{
        const dirConfig = requireDir(fileName)
        acc.push(new dirConfig.default() || new dirConfig())
        return acc
    },[])
}