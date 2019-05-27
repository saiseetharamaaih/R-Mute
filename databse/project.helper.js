const mongoose=require('./dbConnect');


module.exports=function(){
    const projectSchema= new mongoose.Schema({
        title:{
            type:String,
            minlength:1,
            maxlength:225,
            require:true
        },
        description:{
            type:String,
            minlength:1,
            maxlength:1500
        },
        admin:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'users'
        },
        collaborations:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:'users'
        }],
        projectTree:{
            type:Map
        }
    });
    
    const Project= mongoose.model('projects',projectSchema);
    
    const createNewProject=async function(project,admin){
        try{
            if(project.title){
                let newProject=await new Project({
                    title:project.title,
                    description:project.description,
                    admin:admin,
                    collaborations:[],
                    projectTree:{}
                }).save();
                if(await newProject){
                    console.log('new project created',newProject);
                    return newProject._id;
                }
                else{
                    console.log(`got new project undefined`,newProject);
                    return undefined;
                }
            }
        }catch(err){
            console.log(`create new project failed,`,err);
        };
        
    };

    return {
        createNewProject
    }

}
