export const firstLaunchCheck=(data)=>{
    return {
        type: "FirstLaunchCheck",
        data: data
    }
}
export const INC=(data)=>{
    return {
        type: "INC",
        data: data
    }
}
export const DEC=()=>{
    return {
        type: "DEC",
    }
}