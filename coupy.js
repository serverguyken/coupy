const coupon_box_style = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 9999;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
let coupons = [
    'RT84T',
    '54JTRKNQ',
    'FLASHSALE22',
    'DGJKL',
    'XC1063T',
    'DKDF3I494Q',
    'T031T',
]

function init_coupon_box() {
    const coupon_box = document.createElement("div")
    coupon_box.setAttribute("id", "coupon_box")
    coupon_box.setAttribute("style", coupon_box_style)
    const coupon_box_content = document.createElement("div")
    coupon_box_content.setAttribute("id", "coupon_box_content")
    coupon_box_content.classList.add("coupon_box_content_style")
    coupon_box_content.innerHTML = `
        <div class="coupon_box_header" id="coupon_box_header">
            <div class="coupon_box_header_cancel" id="coupon_box_header_cancel">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
            </div>
            <div class="coupon_box_header_txt_contents">
                <h1>Trying Coupon Codes</h1>
                <p>Coupy Shopping is automatically trying the best coupon codes to save you money.</p>
                <p class= "coupon_code_try_msg_txt" id="coupon_code_try_msg_txt">Testing <span id="coupon_code_try_count">0</span> of <span id="coupon_code_try_total">{coupons_length}</span></p>
            </div>
            <style>
                .coupon_box_content_style {
                    width: 500px;
                    height: 300px; 
                    background-color: white;
                    border-radius: 5px;
                    padding: 20px;
                }
                .coupon_box_header {
                    display: flex;
                    flex-direction: column;
                    position: relative;
                }
                .coupon_box_header_cancel {
                    width: 20px;
                    height: 20px;
                    cursor: pointer;
                    position: absolute;
                    top: 4px;
                    right: 10px;
                    padding: 10px;
                }
                .coupon_box_header_cancel:hover {
                    background-color: #f5f5f5;
                    border-radius: 3px;
                }
                .coupon_box_header_txt_contents {
                    margin-top: 40px;
                    text-align: center;
                }
                .coupon_code_try_msg_txt {
                    font-size: 12px;
                    text-align: center;
                }
                @media (max-width: 600px) {
                    .coupon_box_content_style {
                        width: 300px;
                    }
                }
            </style>
        </div>
    `
    coupon_box.innerHTML = coupon_box_content.outerHTML
    const body = document.getElementsByTagName("body")[0]
    body.appendChild(coupon_box)
    const script = document.createElement("script")
    script.innerHTML = `
        document.getElementById("coupon_box_header_cancel").addEventListener("click", (e) => {
            e.preventDefault()
            // Transition out
            document.getElementById("coupon_box").style.transition = "opacity 0.5s ease-in-out"
            document.getElementById("coupon_box").style.opacity = "0"
            setTimeout(() => {
                const coupon_code_btn_el = document.getElementById("coupon_code_btn")
                coupon_code_btn_el.disabled = false
                document.getElementById("coupon_box").remove()
                init_coupon_codes(false)
                stop_try_codes = true
            }, 150)
        })
    `
    body.appendChild(script)
    init_coupon_codes(coupons)
}

function init_coupy_extension() {
    const coupy_card = document.createElement("div")
    coupy_card.innerHTML = `
        <div class="coupy_card_logo_header" id="coupy_card_logo_header">
            <div class="coupy_card_logo" id="coupy_card_logo">
                <h1>C</h1>
            </div>
        </div>
        <style>
            .coupy_card_logo_header {
                position: fixed;
                bottom: 0;
                right: 0;
                width: 60px;
                height: 40px;
                background-color: red;
                cursor: pointer;
                border-top-left-radius: 40px;
                border-top-right-radius: 3px;
            }
            .coupy_card_logo {
                width: 20px;
                height: 20px;
                position: absolute;
                bottom: 25px;
                right: 10px;
                padding: 10px;
                color: white;
            }
            .coupy_card_logo h1 {
                font-size: 30px;
                text-align: center;
            }
        </style>
    `
    const body = document.getElementsByTagName("body")[0]
    body.appendChild(coupy_card)
    const script = document.createElement("script")
    script.innerHTML = `
        const coupy_card = document.getElementById("coupy_card_logo_header")
        coupy_card.addEventListener("click", (e) => {
            init_coupon_box()
        })
    `
    body.appendChild(script)
}


let is_valid_coupon_code = false
let stop_try_codes = false

function try_coupon_code(coupon_code) {
    const coupon_box_con = document.getElementById("coupon_box")
    let coupon_code_input = document.getElementById("coupon_code_input")
    const coupon_code_btn = document.getElementById("coupon_code_btn")
    if (is_valid_coupon_code) {
        coupon_code_btn.disabled = false
    }
    else {
        coupon_code_input.value = coupon_code
        coupon_code_btn.click()
    }
    if (coupon_code_input.value === valid_coupon_code) {
        coupon_box_con.style.transition = "opacity 0.5s ease-in-out"
        coupon_box_con.getElementsByClassName("coupon_box_header_txt_contents")[0].innerHTML = `
            <h1>Coupon Code Applied</h1>
            <p>We've automatically applied the coupon code <span class="coupon_code_applied_txt" style="font-weight: bold;">${coupon_code}</span>, you can now proceed to checkout.</p>
        `
        coupon_code_btn.disabled = true
        is_valid_coupon_code = true
        return true
    }
    return false
}

function init_coupon_codes(coupons) {
    if (coupons !== false ){
        const coupon_box_container = document.getElementById("coupon_box")
        const coupon_code_try_count = document.getElementById("coupon_code_try_count")
        const coupon_code_try_total = document.getElementById("coupon_code_try_total")
        const coupon_code_try_msg_txt = document.getElementById("coupon_code_try_msg_txt")
        const try_time = 1000
        for (let i = 0; i < coupons.length; i++) {
            setTimeout(() => {
                coupon_code_try_count.innerText = i + 1
                coupon_code_try_total.innerText = coupons.length
                coupon_code_try_msg_txt.innerText = `Testing ${i + 1} of ${coupons.length} codes`
                if (stop_try_codes === false) {
                    try_coupon_code(coupons[i])
                }
                if (i === coupons.length - 1) {
                    if (!is_valid_coupon_code) {
                        coupon_box_container.getElementsByClassName("coupon_box_header_txt_contents")[0].innerHTML = `
                        <h1>You have the best price.</h1>
                        <p>We've tried all the codes to find the best price. You can proceed to checkout.</p>
                    `
                    }
                }
            }, i * try_time)
            setTimeout(() => {
                const coupon_code_input = document.getElementById("coupon_code_input")
                coupon_code_input.value = ""
            }, (i + 1) * try_time)
        }
    }
    
}

init_coupy_extension()