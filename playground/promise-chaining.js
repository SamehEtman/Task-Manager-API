require('../src/db/mongoose')
const User = require('../src/models/users')
const Task = require('../src/models/tasks');

const findAndUpdate = async (id , age) =>{
    const doc = await User.findByIdAndUpdate(id , {age});
    const docNums = await User.countDocuments({age})
    return docNums
}
/*
findAndUpdate('60ea1b6a2a7c8d15458a6042' , 1).then((num)=>{
    console.log(num)
}).catch((e)=>{
    console.log(e)
})
*/
const deleteAndCount = async (id)=>{
    const deletedDoc = await Task.findByIdAndRemove(id);
    const countDocs = await Task.countDocuments({completed:false});
    return countDocs;
}

deleteAndCount('60ea1d90ddd0301a9a9e94ff').then((count) =>{
    console.log(count)
}).catch((e)=>{
    console.log(e)
})