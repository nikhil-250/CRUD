const cl = console.log;

const todoform = document.getElementById("todoform");
const todoControl = document.getElementById("todo");
const todoContainer =document.getElementById("todoContainer")
const submitBtn = document.getElementById("submitBtn")
const updateBtn = document.getElementById("updateBtn")

let todoArr =[
    {todoItem : "javascript", todoId: '1'}
]
const onEdit = (ele) => {
    getEditId = ele.parentNode.parentNode.id      //getAttribute('data-id')
    cl(getEditId);
    localStorage.setItem('editId',getEditId)
    let getObj =todoArr.find(todo =>{
      return todo.todoId === getEditId
    })
    cl(getObj)
    todoControl.value =getObj.todoItem
    submitBtn.classList.add(`d-none`)
    updateBtn.classList.remove(`d-none`)
}

const onDelete = (ele) =>{
  let getDeleteId = ele.closest('li').id
  let getIndex =todoArr.findIndex(todo => {
    return todo.todoId === getDeleteId
  })
  cl(getIndex)
  todoArr.splice(getIndex,1)
  localStorage.setItem('todoArray',JSON.stringify(todoArr))
  document.getElementById(getDeleteId).remove()
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
    }
  })
}



const todoTemplating = (arr) => {
    let result = `  <ul class="list-group">`;
    arr.forEach(ele => {
      result += `
             
              <li class="list-group-item d-flex justify-content-between" id="${ele.todoId}">
                <span>  ${ele.todoItem} </span>
                  <span>
                  <button class="btn btn-primary" onClick="onEdit(this)" >Edit</button>
                  <button class="btn btn-danger" onClick="onDelete(this)">Delete</button>
                  </span>
               </li>
             
             `  
    });
    result += `</ul>`
    todoContainer.innerHTML = result;
   
}
if(localStorage.getItem(`todoArray`)){
    todoArr = JSON.parse(localStorage.getItem("todoArray"))
}
todoTemplating(todoArr);

const onTodoHandler = (eve) =>{
    eve.preventDefault();
    let todoObj ={
        todoItem : todoControl.value,
        todoId : generateUUID()
    }
    todoArr.push(todoObj);
    localStorage.setItem(`todoArray`,JSON.stringify(todoArr))
    eve.target.reset();
    cl(todoArr);
    todoTemplating(todoArr)
    Swal.fire({
       
      icon: 'success',
      title: 'New TODO Item Added Successfully !!!',
      showConfirmButton: false,
      timer: 1500
    })
}

const onUpdateHandler = (ele) =>{
  let updatedval = todoControl.value;
  cl(updatedval);
  let updatedId = localStorage.getItem('editId')
cl(updatedId);

//  todoArr.forEach(todo => {
//   if(todo.todoId === updatedId){
//     todo.todoItem = updatedval
//     todoform.reset()

//   }
//  })
let getIndex = todoArr.findIndex(todo => {
  return todo.todoId === updatedId
})
cl(getIndex)
todoArr[getIndex].todoItem = updatedval;
localStorage.setItem('todoArray',JSON.stringify(todoArr))
let li = document.getElementById(updatedId);
cl(li.firstElementChild);
li.firstElementChild.innerHTML = updatedval;
todoform.reset()
updateBtn.classList.add('d-none');
submitBtn.classList.remove('d-none')

}



todoform.addEventListener("submit", onTodoHandler)
updateBtn.addEventListener("click",onUpdateHandler)


function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0,
        v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
  
  const uuid = generateUUID();
  console.log(uuid);