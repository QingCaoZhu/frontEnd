let body = document.getElementsByTagName('body')
let containers = document.getElementsByClassName('container')
let trash = document.getElementById("trash")
let urlInput = document.getElementById('urlInput')
let copyedElem // 复制的对象
let dragged
let ofx
let ofy
let backOrder = 0
let curFileFolder
// 右键菜单事件
document.oncontextmenu = (event) => {
  event.preventDefault()
};
// 所有点击事件
const desktopEve = (event) => {
  let e = event || window.event
  let fileMenus = document.getElementsByClassName('fileMenu')
  let desktopMenus = document.getElementsByClassName('desktopMenu')
  if (e.button == 0) { // 单击桌面
    for (let i of e.target.children) {
      if (i.classList.contains('icon')) {
        i.classList.remove('active')
      }
    }
    for(let f of fileMenus) {
      f.style.display = 'none'
    }
    desktopMenus[0].style.display = 'none'
  } else if (e.button == 2 && e.target.classList.contains('filefolder')) { // 文件夹打开后右击
    let fileFolderMenu = document.createElement('ul')
    let menuItem0 = document.createElement('li')
    menuItem0.innerText = '新建文件夹'
    menuItem0.addEventListener('click', newFileFolder)
    fileFolderMenu.appendChild(menuItem0)
    fileFolderMenu.classList.add('fileFolderMenu')
    fileFolderMenu.style.display = 'block'
    fileFolderMenu.style.top = e.offsetY + 'px'
    fileFolderMenu.style.left = e.offsetX + 'px'
    containers[1].appendChild(fileFolderMenu)
  } else if (e.button == 2 && e.target.classList.contains('container')) { // 右击桌面
    desktopMenus[0].style.display = 'block'
    desktopMenus[0].style.top = e.offsetY + 'px'
    desktopMenus[0].style.left = e.offsetX + 'px'
  }
}
const filefolderEve = (event) => {
  let e = event || window.event
  if (e.button == 0) {
    e.target.parentNode.classList.add('active')
  } else if (e.button == 2) {
    e.target.parentElement.children[2].style.display = 'block'
    e.target.parentElement.children[2].style.top = e.clientY + 'px'
    e.target.parentElement.children[2].style.left = e.clientX + 'px'
  }
  e.stopPropagation()
  return false
}

// 更改桌面背景事件
const changeBack = (event) => {
  let e = event || window.event
  backOrder = (backOrder + 1) % 4
  body[0].style.backgroundImage = `url(desktop/back${backOrder}.jpg)`
  e.stopPropagation()
  return false
}

// 打开网址
const openBrowser = (event) => {
  let e = event || window.event
  if (e.keyCode == 13 || e.button == 0) {
    let i = document.getElementById('iframe')
    i.setAttribute('src', urlInput.value)
  }
  e.stopPropagation()
  return false
}
// 拖拽开始事件
const dragStart = (event) => {
  let e = event || window.event
  dragged = e.target.parentElement
  ofx = e.offsetX
  ofy = e.offsetY
  return false
}
// 拖拽过程事件
const dragover = (event) => {
  let e = event || window.event
  e.preventDefault()
  return false
}
// 拖拽结束事件
const drop = (event) => {
  let e = event || window.event
  dragged.style.position = "absolute"
  dragged.style.left = (e.offsetX - ofx) + 'px'
  dragged.style.top = (e.offsetY - ofy) + 'px'
  return false
}
// 打开文件夹事件
const openFileFolder = (event) => {
  let e = event || window.event
  let filefolder = containers[0].cloneNode()
  let img = document.createElement('img')
  img.src = "desktop/close.svg"
  img.classList.add('close')
  img.addEventListener('click', (e) => {
    e.target.parentNode.remove()
  })
  filefolder.appendChild(img)
  filefolder.classList.add('filefolder')
  body[0].appendChild(filefolder)
  e.stopPropagation()
  return false
}
// 复制文件夹
const copyFileFolder = (event) => {
  let e = event || window.event
  copyedElem = e.target.parentElement.parentElement.cloneNode(true)
  e.stopPropagation()
  return false
}
// 删除文件夹
const delFileFolder = (event) => {
  let e = event || window.event
  trash.appendChild(e.target.parentElement.parentElement)
  e.target.parentElement.remove()
  e.stopPropagation()
  return false
}
// 文件夹重命名
const renameFileFolder = (event) => {
  let e = event || window.event
  e.target.parentElement.parentElement.children[1].focus()
  e.target.parentElement.parentElement.children[1].setSelectionRange(-1,-2,'backward')
  e.target.parentNode.style.display = 'none'
  e.stopPropagation()
  return false
}
// 新建文件夹事件
const newFileFolder = (event) => {
  let e = event || window.event
  let newItem = containers[0].children[0].cloneNode(true)
  newItem.style.display = 'block'
  e.target.parentElement.parentElement.appendChild(newItem)
  e.target.parentElement.style.display = 'none'
  e.stopPropagation()
  return false
}
// 粘贴文件夹
const pasteFileFolder = (event) => {
  let e = event || window.event
  e.target.parentElement.parentElement.appendChild(copyedElem)
  e.stopPropagation()
  return false
}