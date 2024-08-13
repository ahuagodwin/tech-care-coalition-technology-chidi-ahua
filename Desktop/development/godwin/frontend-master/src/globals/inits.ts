
import {Tooltip} from "bootstrap"

// Initialise Bootstrap tooltips
window.onload = ()=>{
    Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]')).forEach(tooltipNode => new Tooltip(tooltipNode))
}