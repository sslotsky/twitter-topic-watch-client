function scroll(node, jump, timeout) {
  if (node.scrollTop > 0) {
    const nextStop = node.scrollTop - jump
    node.scrollTop = Math.max(nextStop, 0)
    setTimeout(() => {
      scroll(node, jump, timeout)
    }, timeout)
  }
}

export function scrollTop(node, duration) {
  const interval = duration / node.scrollTop
  if (interval < 1) {
    const jump = Math.round(1 / interval)
    scroll(node, jump * 5, 1)
  } else {
    const timeout = Math.round(interval)
    scroll(node, 5, timeout)
  }
}
