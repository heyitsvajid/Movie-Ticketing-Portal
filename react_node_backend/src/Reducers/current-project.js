export default function(state={},action){
    switch(action.type){
        case "CURRENT_PROJECT": 
            return action.payload;
            break;
    }
    return state;
}