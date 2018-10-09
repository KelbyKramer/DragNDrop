function dragAndDrop() {
  var acceptableDragList = ['FIGURE', 'FIGCAPTION', 'P', 'H1', 'IMG'];
  var acceptableDropList = ['ARTICLE', 'FIGURE'];
  var ghostElement;
  var uniqueElementId = 1;

  function dragStartHandle(e) {
    e.target.style.opacity = 0.4;
    e.dataTransfer.setData("elementId", e.target.dataset.dragId);
  }

  function dragOverHandle(e) {
    if(acceptableDropList.indexOf(e.target.nodeName) != -1) {
      var inserted = false;
      var cList = e.target.children;
      if(!cList) {
        e.target.appendChild(ghostElement);
        return;
      }
      for(var i=0; i<cList.length; i++) {
        var childPos = cList[i].offsetTop;
        var parentPos = e.target.offsetTop;
        if(e.offsetY < childPos - parentPos) {
          e.target.insertBefore(ghostElement, cList[i]);
          inserted = true;
          break;
        }
      }
      if(!inserted) e.target.appendChild(ghostElement);
    }
    return false;
  }

  function dropHandle(e) {
    var positions = [];
    var elementId = e.dataTransfer.getData("elementId");
    var draggedElement = document.querySelector('[data-drag-id="' + elementId + '"]');
    console.log("dropping")
    if(ghostElement.parentNode) {
      ghostElement.parentNode.insertBefore(draggedElement, ghostElement);
    }
    e.preventDefault();
    
    //const art2 = document.querySelectorAll("[data-drag-id]");
    const art2 = document.querySelectorAll("#data-drag-id , p");
    for (var i = 0; i < art2.length; i++) {
      //Currently, data-drag-id #1 is the header, so we will ignore that 
      // and subtract one from all ids for our array.
      //furthermore 10 and 9 are rally one item- the "Larger Release box"
      //   ignoring that for now since may not be
      positions.push(art2[i].getAttribute("data-drag-id")-1)
        //console.log(art2[i].getAttribute("data-drag-id"));
        
      
    }
    console.log(positions)

    
  }

  function dragEndHandle(e) {
    e.target.style.opacity = 1;
    setTimeout(function() {
      if(ghostElement.parentNode) {
        ghostElement.parentNode.removeChild(ghostElement);
      }
    }, 100);
  }

  function addDragHandle(el) {
    el.ondragover = dragOverHandle;
    el.ondrop = dropHandle;

    var cList = el.children;
    for(var i=0; i<cList.length; i++) {
      if(acceptableDropList.indexOf(cList[i].nodeName) != -1) {
        addDragHandle(cList[i]);
      }
      if(acceptableDragList.indexOf(cList[i].nodeName) != -1) {
        cList[i].ondragstart = dragStartHandle;
        cList[i].ondragend = dragEndHandle;
        cList[i].draggable = true;
        cList[i].dataset.dragId = uniqueElementId++;
      }
    }
    ghostElement = document.createElement("div");
    ghostElement.className = 'ghost';
    ghostElement.innerHTML = 'Drop here';
  }

  function init(querySelectString) {
    var el = document.querySelector(querySelectString);
    addDragHandle(el);
  }

  return {
    init: init
  }
}
