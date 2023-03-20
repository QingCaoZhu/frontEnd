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
// 桌面点击事件
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
  } else if (e.button == 2) { // 右击桌面
    desktopMenus[0].style.display = 'block'
    desktopMenus[0].style.top = e.offsetY + 'px'
    desktopMenus[0].style.left = e.offsetX + 'px'
  }
  e.stopPropagation()
  return false
}
// 文件夹图标点击事件
const fileIconEve = (event) => {
  let e = event || window.event
  if (e.button == 0) {
    e.target.parentNode.classList.add('active')
  } else if (e.button == 2) {
    e.target.parentElement.children[2].style.display = 'block'
    e.target.parentElement.children[2].style.top = e.offsetY + 'px'
    e.target.parentElement.children[2].style.left = e.offsetX + 'px'
  }
  e.stopPropagation()
  return false
}
// 文件夹点击事件
const filefolderEve = (event) => {
  let e = event || window.event
  if (e.button == 0) {
    for (let i of e.target.children) {
      if (i.classList.contains('icon')) {
        i.classList.remove('active')
      } else if (i.classList.contains('fileFolderMenu')) {
        i.style.display = 'none'
      }
    }
  } else if (e.button == 2) {
    for (let i of e.target.children) {
      if (i.classList.contains('fileFolderMenu')) {
        i.style.display = 'block'
        i.style.top = e.offsetY + 'px'
        i.style.left = e.offsetX + 'px'
      }
    }
  }
  e.stopPropagation()
  return false
}
// 更改桌面背景事件
const changeBack = (event) => {
  let e = event || window.event
  let body = document.getElementsByTagName('body')
  backOrder = (backOrder + 1) % 4
  body[0].style.backgroundImage = `url(desktop/back${backOrder}.jpg)`
  e.stopPropagation()
  return false
}

// 打开网址
const openBrowser = (event) => {
  let e = event || window.event
  let urlInput = document.getElementById('urlInput')
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
  if (e.target.tagName == 'IMG') {
    e.target.parentElement.nextElementSibling.style.display = 'block'
  } else if (e.target.tagName == 'LI') {
    e.target.parentElement.parentElement.nextElementSibling.style.display = 'block'
  }
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
  let trash = document.getElementById("trash")
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
  let containers = document.getElementsByClassName('container')
  let newItem1 = containers[0].children[0].cloneNode(true)
  let newItem2 = containers[0].children[1].cloneNode(true)
  newItem1.style.display = 'block'
  e.target.parentElement.parentElement.appendChild(newItem1)
  e.target.parentElement.parentElement.appendChild(newItem2)
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