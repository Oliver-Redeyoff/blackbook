class formValidator {

    constructor(schema) {
        this.schema = schema
    }

    getElement(key) {
        return this.schema[key]
    }

    generateInitialForm() {
        var form = {}
        for (var key in this.schema) {
            form[key] = {
                label: this.schema[key].label,
                value: this.schema[key].initialValue
            }
        }
        return form
    }

}

export default formValidator