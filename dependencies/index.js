const validateDependencies = () => {
    process.env.REDIS_PORT = process.env.REDIS_PORT || 6379; //yeah, it's a hack
    const missingEnvVars = [];
    const envVarNames = getDependencyEnvVars();
    envVarNames.forEach(envVar =>{
        if(!process.env[envVar]) missingEnvVars.push(envVar);
    });

    if(missingEnvVars.length > 0){
        const str =  `The following required environment variable are missing: ${JSON.stringify(missingEnvVars)}. Server shutting down at ${new Date()}.`;
        throw new Error(str);
    }
};

const getDependencyEnvVar = (envVar) => {
    return process.env[envVar];
};

const getDependencyEnvVars = () => {
    return ['REDIS_HOST','REDIS_PORT','REDIS_PWD']
};

module.exports = {validateDependencies,getDependencyEnvVar,getDependencyEnvVars};