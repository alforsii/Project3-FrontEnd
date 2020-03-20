
 const toggle = () => {
    const mainSidebar = document.getElementById('main-sidebar')
    const sidebar = document.getElementById('side-bar')
    const menuHamburger = document.getElementById('menu-bars-btn')
    menuHamburger.style.cursor = 'pointer'
    menuHamburger.addEventListener('click', event => {
        if(sidebar.classList.contains('hide-sidebar')){
            mainSidebar.classList.remove('hide-main-sidebar')
            sidebar.classList.remove('hide-sidebar')
        }
        mainSidebar.classList.add('show-sidebar')
       sidebar.classList.add('show-sidebar')
    })

    mainSidebar.addEventListener('click', event => {
        if(sidebar.classList.contains('show-sidebar')){
            sidebar.classList.add('hide-sidebar')
            mainSidebar.classList.add('hide-main-sidebar')
            setTimeout(()=>{
            mainSidebar.classList.remove('show-sidebar')
            // sidebar.classList.remove('show-sidebar')
            },300)
        }
    })

}
export default toggle