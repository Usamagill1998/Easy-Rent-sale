const LaunchCheck=(state=1, action)=>{
    switch(action.type)
    {
        case "FirstLaunchCheck":
            return action.data;
        case "INC":
            return -1;
        case "DEC":
            return state - 1;
        default:
            return state;
    }
}
export default LaunchCheck;