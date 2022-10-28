export const vDrag = {
  mounted (el) {
    const parentWidth = el.parentNode.clientWidth
    const previousElement = el.previousElementSibling
    el.onmousedown = function (e) {
      const startX = e.clientX;
      const height = previousElement.offsetWidth;
      el.style.borderRight = '2px solid #00bd87'
      // 鼠标拖动事件
      document.onmousemove = function (e) {
        const endX = e.clientX;
        const moveLen = height + (endX - startX); // （endx-startx）=移动的距离。el.left+移动的距离=左边区域最后的宽度
        const maxT = parentWidth - el.offsetWidth; // 容器宽度 - 左边区域的宽度 = 右边区域的宽度

        if (moveLen < 200) moveLen = 200; // 左边区域的最小宽度为32px
        if (moveLen > parentWidth - 200) moveLen = maxT - 200; //右边区域最小宽度为150px

        previousElement.style.width = moveLen + 'px';
      };
      // 鼠标松开事件
      document.onmouseup = function (evt) {
        el.style.borderWidth = '0px';
        document.onmousemove = null;
        document.onmouseup = null;
        el.releaseCapture && el.releaseCapture(); //当你不在需要继续获得鼠标消息就要应该调用ReleaseCapture()释放掉
      }
      el.setCapture && el.setCapture() //该函数在属于当前线程的指定窗口里设置鼠标捕获
      return false
    }
  }
}
