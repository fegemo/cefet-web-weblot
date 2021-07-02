const options = {
   threshold: 1
}

const callback = entries => {
   entries.forEach(entry => {
      entry.target.classList.toggle('animate', entry.isIntersecting)
   })
}

export const observer = new IntersectionObserver(callback, options)
