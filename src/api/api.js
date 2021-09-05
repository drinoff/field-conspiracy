

export const settings = {
    host : '',
    authHost: ''
};
async function request(url,options){
    try {
        const response  = await fetch(url,options);

        if(response.ok == false){
            const error = await response.json();
            throw new Error(error.message);
        }
        try {
        const data = await response.json();      
        return data;
        }catch(err){
            return response;
        }
    } catch (err) {
        alert(err.message)
        throw new Error(err.message
            );
    }
}

function getOptions(method = 'get',body){

    const options = {
        method,
        headers: {}
    };

    const token = sessionStorage.getItem('authToken');
    if(token !=null){
        options.headers['X-Authorization'] = token;
    }
    if(body){
        options.headers['Content-Type'] = 'application/json';
        options.headers['Access-Control-Allow-Origin'] = '*';
        options.header[X-Content-Type-Options] = 'nosniff'
        options.body = JSON.stringify(body);
    }

    return options;
}

export async function get(url){
    return await request(url,getOptions());
}

export async function post(url,data){
    return await request(url,getOptions('post',data))
}

export async function put(url,data){
    return await request(url,getOptions('put',data));
}


export async function del(url){
    return await request(url,getOptions('delete'));
}


