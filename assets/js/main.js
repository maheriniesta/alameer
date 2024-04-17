var diameter = document.getElementById("diameter");
var bars = document.getElementById("bars");
var barLength = document.getElementById("bar-length");
var desc = document.getElementById("desc");
var addBtn = document.getElementById("add-btn");
var clearBtn = document.getElementById("clear-btn");
var table = document.getElementById("table");
var total = document.getElementById("total");
var deleteAll = document.getElementById("delete-all");
var sales = [];
var currentIndex;


if(localStorage.getItem("sales") == null){
    var sales =[];
}
else{
    var sales = JSON.parse(localStorage.getItem("sales"));
    printSales();
}

addBtn.onclick = function(e){
    e.preventDefault();
    addToSales();
    printSales();
    clearForm();
}
clearBtn.onclick = function(){
    clearForm();
}
function clearForm(){
    diameter.value = "";
    bars.value = "";
    barLength.value = "";
    desc.value = "";
}
function addToSales(){
        var sale = {
            saleDiameter : diameter.value,
            saleBars : bars.value,
            saleBarLength : barLength.value,
            saleDesc : desc.value
        }
        sales.push(sale);
    localStorage.setItem("sales", JSON.stringify(sales));
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'تمت إضافة العنصر بنجاح',
        showConfirmButton: false,
        timer: 1500
      })

}
function calcWeight(x){
    var weight;
    if(x == 8) weight = 0.4;
    else if(x == 10) weight = 0.635;
    else if(x == 12) weight = 0.915;
    else if(x == 14) weight = 1.15;
    else if(x == 16) weight = 1.6;
    else if(x == 18) weight = 2;
    else if(x == 20) weight = 2.5;
    else if(x == 22) weight = 2.98;
    else if(x == 25) weight = 3.85;
    else weight = 0;
    return weight;
}
function printSales(){
    var weightSum = 0;
    var data = "";
    for(var i = 0; i < sales.length;i++){
        var result = calcWeight(sales[i].saleDiameter) * sales[i].saleBars * sales[i].saleBarLength;

        weightSum += result;
        data += `
        <tr >
        <td class="text-white">${i+1}</td>
        <td class="text-white">${sales[i].saleDiameter}</td>
        <td class="text-white">${sales[i].saleBars}</td>
        <td class="text-white">${sales[i].saleBarLength}</td>
        <td class="text-white">${sales[i].saleDesc}</td>
        <td class="text-white">${result}</td>

        
        <td><button type="button" onclick="deleteSale(${i})" class="btn btn-danger">حذف</button></td>
        </tr>
        `
    }
table.innerHTML = data ;
total.innerHTML = `مجموع الأوزان = ${weightSum}`;
}
function deleteSale(x){
    Swal.fire({
        title: 'متاكد بدك تحذف ولا بتتخوث على اهلي ؟',
        text: "!علي الطلاق ما برجعو ان انحذف ماشي",
        icon: 'تحذير',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'اخذف خلص ولا لا '
      }).then((result) => {
        if (result.isConfirmed) {
            sales.splice(x,1);
            localStorage.setItem("sales", JSON.stringify(sales));
            printSales();
          Swal.fire(
            'تم الحذف',
            'تم حذف العنصر',
            'success'
          )
        }
      })
}
// function getOldData(x){
//     diameter.value = sales[x].diameter;
//     bars.value = sales[x].bars;
//     barLength.value = sales[x].barLength;
//     currentIndex = x;
//     addBtn.innerHTML = 'تحديث';
// }
// function updateSale(x){
//     sales[x].diameter = diameter.value;
//     sales[x].bars = bars.value;
//     sales[x].barLength = barLength.value;
//     addBtn.innerHTML = 'إضافة';
// }
// function getOldData(index){
//     diameter.value = sales[index].diameter;
//     bars.value = sales[index].bars;
//     barLength.value = sales[index].barLength;
//     currentIndex = index;
//     addBtn.innerHTML = "تحديث";
// }
// function updateSale(x){
//     sales[x].saleDiameter = diameter.value;
//     sales[x].saleBars = bars.value;
//     sales[x].saleBarLength = barLength.value;
//     addBtn.innerHTML = "إضافة";
// }
deleteAll.onclick = function(){
    
    Swal.fire({
        title: 'بدك تحذف كلشي متاكد',
        text: "!ترا اذا غلطت ابو كرم رح يلحقك ل الضفة ",
        icon: 'تحذير',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'اخذف خلص ولا لا '
      }).then((result) => {
        if (result.isConfirmed) {
            sales = [];
             table.innerHTML = "";
             localStorage.removeItem("sales");
             printSales();
          
          Swal.fire(
            'تم الحذف',
            'تم حذف العنصر',
            'success'
          )
        }
      })
}
