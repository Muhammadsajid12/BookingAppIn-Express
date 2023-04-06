class apiError extends Error{
    constructor(code , message){
        super(message)
this.code=code
this.message = message

    }
static notFound(msg){

return new apiError(404,msg)
}

static badRequest(msg){

return new apiError(400,msg)

}



}

module.exports=apiError