const publicUrl="https://ho-ng-b-i-1.paiza-user-free.cloud:5000/";
function GetFetch(link: string, Action:Function,contextData?:string):void {
    fetch(publicUrl+link,{
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization':'Lank '+contextData
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            Action(data);
        })
        .catch(error => {
            alert(error.message)
        });
}//GetFetch<User>(url, Function);

function PostFetch<T>(link:string,data:any,Action:(data:T)=>void,contextData?:string):void{
    fetch(publicUrl+link, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization':'Lank '+contextData
        },
        body: JSON.stringify(data),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json() as Promise<T>;
    })
    .then(data => {
        Action(data);
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}

function PutFetch(link:string,data:any,Action:Function,contextData?:string):void{
    fetch(publicUrl+link, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization':'Lank '+contextData
        },
        body: JSON.stringify(data),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        Action(data);
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}

function DeleteFetch(link:string,Action:Function,contextData?:string):void{
    fetch(publicUrl+link, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization':'Lank '+contextData
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        Action(data);
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}

function PostImage(link:string,data:FormData,Action:(data:any)=>void,contextData?:string):Promise<any>{
    return fetch(publicUrl+link, {
        method: 'POST',
        headers: {
            'Authorization':'Lank '+contextData
        },
        body: data,
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();
    })
    .then(data => {
        Action(data);
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}

export {GetFetch,PostFetch,PutFetch,DeleteFetch,PostImage}