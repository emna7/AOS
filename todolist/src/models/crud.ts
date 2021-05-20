const mongoose = require('mongoose');

function Read(Obj: any): any{
    return Obj.find({});
}

function Create(Obj: any, Data: any): any {
    let newObj = new Obj(Data); // this is modal object.
    newObj.save()
        .then((data: any) => {
            console.log(data);
        })
        .catch((err: any) => {
            console.log(err);
        })
    return Obj;
}

function Delete(Obj: any, id: string): void {
    if (mongoose.Types.ObjectId.isValid(id)) {
        Obj.remove({ _id: id })
            .then((data: any) => {
                if (data) {
                    console.log("User is successfully deleted.");
                } else {
                    console.log("User doesnt exist.");
                }
            }).catch((err: any) => {
                console.log(err);
            })
    } else {
        console.log("Incorrect ID");
    }
}

export { Create, Read, Delete};