/**
 * SearchBuilderConditions.js
 * A module containing condition functions for DataTables SearchBuilder
 * Organized by data type and condition type
 */

const SearchBuilderConditions = (function () {
    /**
     * Helper function for conditions that don't require input
     * @param {string} translationKey - i18n key for the condition name
     * @returns {Object} Condition object
     */
    function noInputCondition(translationKey) {
        return {
            conditionName: function (dt, i18n) {
                return dt.i18n(translationKey);
            },
            init: function (that) {
                that.s.dt.one('draw.dtsb', function () {
                    that.s.topGroup.trigger('dtsb-redrawLogic');
                });
            },
            inputValue: function () {
            },
            isInputValid: function () {
                return true;
            }
        };
    }

    /**
     * Helper function to collect unique values from column
     * @param {Object} that - The SearchBuilder instance
     * @param {string} dataIdx - The column index
     * @returns {Set} Set of unique values
     */
    function get_field_choices(field_name, fields_config) {
        for (const item of fields_config) {
            if (item.name == field_name) {
                return item.choices
            }
        }
    }

    /**
     * Create a select dropdown with values
     * @param {Object} that - The SearchBuilder instance
     * @param {Set} values - Set of values to populate the dropdown
     * @returns {jQuery} The wrapper containing the select element
     */
    function createSelectDropdown(that, values) {
        const wrapper = $('<div/>');
        const input = $('<select/>')
            .addClass(that.classes.value)
            .addClass(that.classes.input)
            .addClass('dtsb-value dtsb-dropDown form-select dtsb-italic dtsb-greyscale')

        $('<option value="">' + "Select" + '</option>').appendTo(input);

        // Add unique values to dropdown
        Array.from(values).sort().forEach(function (item, index) {
            var option = $('<option>').val(item[0]).text(item[1]);
            option.appendTo(input);
        });

        input.appendTo(wrapper);
        return wrapper;
    }

    // The main conditions object organized by data type
    return {
        // Array type conditions
        array: {
            /**
             * Equal condition for arrays
             * Checks if array equals the selected value
             */
            equal: function (fields_config) {
                return {
                    conditionName: function (dt, i18n) {
                        return dt.i18n('searchBuilder.conditions.array.equals');
                    },
                    init: function (that, fn, opts) {
                        const values = get_field_choices(that.s.origData, fields_config);
                        let el = createSelectDropdown(that, values);
                        $(el).on('change', function () {
                            fn(that, this);
                        });
                        return el
                    },
                    inputValue: function (el) {
                        return $(el[0]).find('select').val();
                    },
                    isInputValid: function (el, that) {
                        return $(el[0]).find('select').val().length > 0;
                    },
                };
            },

            /**
             * Not equal condition for arrays
             * Checks if array does not equal the selected value
             */
            notEqual: function (fields_config) {
                return {
                    conditionName: function (dt, i18n) {
                        return dt.i18n('searchBuilder.conditions.array.not');
                    },
                    init: function (that, fn, opts) {
                        const values = get_field_choices(that.s.origData, fields_config);
                        let el = createSelectDropdown(that, values);
                        $(el).on('change', function () {
                            fn(that, this);
                        });
                        return el
                    },
                    inputValue: function (el) {
                        return $(el[0]).find('select').val();
                    },
                    isInputValid: function (el, that) {
                        return $(el[0]).find('select').val().length > 0;
                    },
                };
            },

            /**
             * Contains condition for arrays
             * Checks if array contains the selected value
             */
            contains: function (fields_config) {
                return {
                    conditionName: function (dt, i18n) {
                        return dt.i18n('searchBuilder.conditions.array.contains');
                    },
                    init: function (that, fn, opts) {
                        const values = get_field_choices(that.s.origData, fields_config);
                        let el = createSelectDropdown(that, values);
                        $(el).on('change', function () {
                            fn(that, this);
                        });
                        return el
                    },
                    inputValue: function (el) {
                        return $(el[0]).find('select').val();
                    },
                    isInputValid: function (el, that) {
                        return $(el[0]).find('select').val().length > 0;
                    },
                };
            },

            /**
             * Not contains condition for arrays
             * Checks if array does not contain the selected value
             */
            notContains: function (fields_config) {
                return {
                    conditionName: function (dt, i18n) {
                        return dt.i18n('searchBuilder.conditions.array.notContains');
                    },
                    init: function (that, fn, opts) {
                        const values = get_field_choices(that.s.origData, fields_config);
                        let el = createSelectDropdown(that, values);
                        $(el).on('change', function () {
                            fn(that, this);
                        });
                        return el
                    },
                    inputValue: function (el) {
                        return $(el[0]).find('select').val();
                    },
                    isInputValid: function (el, that) {
                        return $(el[0]).find('select').val().length > 0;
                    },
                };
            },

            /**
             * Empty condition for arrays
             * Checks if array is empty
             */
            empty: function () {
                return noInputCondition('searchBuilder.conditions.array.empty');
            },

            /**
             * Not empty condition for arrays
             * Checks if array is not empty
             */
            notEmpty: function () {
                return noInputCondition('searchBuilder.conditions.array.notEmpty');
            }
        },

        // String type conditions
        string: {
            /**
             * Equal condition for strings
             */
            equal: function () {
                return {};  // Use default DataTables implementation
            },

            /**
             * Not equal condition for strings
             */
            notEqual: function () {
                return {};  // Use default DataTables implementation
            },

            /**
             * Contains condition for strings
             */
            contains: function () {
                return {};  // Use default DataTables implementation
            },

            /**
             * Not contains condition for strings
             */
            notContains: function () {
                return {};  // Use default DataTables implementation
            },

            /**
             * Starts with condition for strings
             */
            startsWith: function () {
                return {};  // Use default DataTables implementation
            },

            /**
             * Not starts with condition for strings
             */
            notStartsWith: function () {
                return {};  // Use default DataTables implementation
            },

            /**
             * Ends with condition for strings
             */
            endsWith: function () {
                return {};  // Use default DataTables implementation
            },

            /**
             * Not ends with condition for strings
             */
            notEndsWith: function () {
                return {};  // Use default DataTables implementation
            },

            /**
             * Empty condition for strings
             */
            empty: function () {
                return noInputCondition('starlette-admin.conditions.empty');
            },

            /**
             * Not empty condition for strings
             */
            notEmpty: function () {
                return noInputCondition('starlette-admin.conditions.notEmpty');
            }
        },

        // Number type conditions
        number: {
            /**
             * Equal condition for numbers
             */
            equal: function () {
                return {};  // Use default DataTables implementation
            },

            /**
             * Not equal condition for numbers
             */
            notEqual: function () {
                return {};  // Use default DataTables implementation
            },

            /**
             * Greater than condition for numbers
             */
            greaterThan: function () {
                return {};  // Use default DataTables implementation
            },

            /**
             * Greater than or equal condition for numbers
             */
            greaterThanOrEqual: function () {
                return {};  // Use default DataTables implementation
            },

            /**
             * Less than condition for numbers
             */
            lessThan: function () {
                return {};  // Use default DataTables implementation
            },

            /**
             * Less than or equal condition for numbers
             */
            lessThanOrEqual: function () {
                return {};  // Use default DataTables implementation
            },

            /**
             * Between condition for numbers
             */
            between: function () {
                return {};  // Use default DataTables implementation
            },

            /**
             * Not between condition for numbers
             */
            notBetween: function () {
                return {};  // Use default DataTables implementation
            },

            /**
             * Empty condition for numbers
             */
            empty: function () {
                return noInputCondition('starlette-admin.conditions.empty');
            },

            /**
             * Not empty condition for numbers
             */
            notEmpty: function () {
                return noInputCondition('starlette-admin.conditions.notEmpty');
            }
        },

        // Date type conditions
        date: {
            /**
             * Equal condition for dates
             */
            equal: function () {
                return {};  // Use default DataTables implementation
            },

            /**
             * Not equal condition for dates
             */
            notEqual: function () {
                return {};  // Use default DataTables implementation
            },

            /**
             * Greater than condition for dates
             */
            greaterThan: function () {
                return {};  // Use default DataTables implementation
            },

            /**
             * Greater than or equal condition for dates
             */
            greaterThanOrEqual: function () {
                return {};  // Use default DataTables implementation
            },

            /**
             * Less than condition for dates
             */
            lessThan: function () {
                return {};  // Use default DataTables implementation
            },

            /**
             * Less than or equal condition for dates
             */
            lessThanOrEqual: function () {
                return {};  // Use default DataTables implementation
            },

            /**
             * Between condition for dates
             */
            between: function () {
                return {};  // Use default DataTables implementation
            },

            /**
             * Not between condition for dates
             */
            notBetween: function () {
                return {};  // Use default DataTables implementation
            },

            /**
             * Empty condition for dates
             */
            empty: function () {
                return noInputCondition('starlette-admin.conditions.empty');
            },

            /**
             * Not empty condition for dates
             */
            notEmpty: function () {
                return noInputCondition('starlette-admin.conditions.notEmpty');
            }
        },

        // Boolean type conditions
        boolean: {
            /**
             * True condition for booleans
             */
            true: function () {
                return noInputCondition('starlette-admin.conditions.true');
            },

            /**
             * False condition for booleans
             */
            false: function () {
                return noInputCondition('starlette-admin.conditions.false');
            },

            /**
             * Empty condition for booleans
             */
            empty: function () {
                return noInputCondition('starlette-admin.conditions.empty');
            },

            /**
             * Not empty condition for booleans
             */
            notEmpty: function () {
                return noInputCondition('starlette-admin.conditions.notEmpty');
            }
        }
    };
})();