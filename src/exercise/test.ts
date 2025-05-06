(async function () {
    const lis = Array.from(document.querySelectorAll('li'));
    lis.forEach((li) => {
        li.addEventListener("click", () => {
            li.style.backgroundColor = "yellow";
            li.style.fontWeight = "bold";

            let otherLis = lis.filter(x => x !== li)
            otherLis.forEach((otherLi) => {
                otherLi.style.backgroundColor = "";
                li.style.fontWeight = ""
            })
    })
    })
})