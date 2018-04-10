export const currentProject = (currentProject) => {
    console.log("Action index.js");
    console.log(currentProject);
    return{
        type:"CURRENT_PROJECT",
        payload: currentProject
    }
}
