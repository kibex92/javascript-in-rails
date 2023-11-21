import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="insert-in-list"
export default class extends Controller {
  static targets = ["items", "form"]

  send(event) {
    event.preventDefault();
    const url = this.formTarget.action
    const body = new FormData(this.formTarget)
    const requestOptions = {
      method: "POST",
      headers: { "Accept": "application/json" },
      body: body
    }

    fetch(url, requestOptions)
      .then(response => response.json())
      .then(data => {
        if (data.inserted_item) {
          this.itemsTarget.insertAdjacentHTML("beforeend", data.inserted_item)
        }
        this.formTarget.outerHTML = data.form
    })
  }
}
