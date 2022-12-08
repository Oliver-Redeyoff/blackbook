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

    validate(form) {
        resForm = {...form}

        formIsValid = true
        for (var key in resForm) {

            if (this.schema.hasOwnProperty(key) == false) {
                resForm[key].isValid = false
                formIsValid = false
            }

            else if (this.schema[key].hasOwnProperty('validation')) {
                resForm[key].isValid = resForm[key].validate(resForm[key].value)
                if (resForm[key].isValid == false) {
                    formIsValid = false
                }
            }
            
            else {
                resForm[key].isValid = True
            }

        }

        return resForm
    }

}

export default formValidator