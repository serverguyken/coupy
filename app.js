const valid_coupon_code = "XC1063T"
function validate_coupon() {
    const coupon_code = document.getElementById("coupon_code_input").value
    const coupon_code_msg_txt = document.getElementById("coupon_code_msg_txt")
    if (coupon_code == "") { 
        coupon_code_msg_txt.innerHTML = "Please enter a coupon code"
        coupon_code_msg_txt.classList.add("error_txt")
        return false
    }
    if (coupon_code == valid_coupon_code) {
        coupon_code_msg_txt.classList.remove("error_txt")
        coupon_code_msg_txt.classList.add("success_txt")
        coupon_code_msg_txt.innerHTML = "Successfully applied coupon code"
        return true
    } else {
        coupon_code_msg_txt.classList.remove("success_txt")
        coupon_code_msg_txt.classList.add("error_txt")
        coupon_code_msg_txt.innerHTML = "Sorry, this coupon code is not valid"
        return false
    }
}

document.getElementById("coupon_code_btn").addEventListener("click", (e) => {
    e.preventDefault()
    validate_coupon(e)
})
document.getElementById("coupon_code_input").addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        validate_coupon()
    }
})