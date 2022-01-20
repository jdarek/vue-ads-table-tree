export default {
    computed: {
        exportColumns () {
            return this.columns.filter(column => column.export);
        },
    },

    methods: {
        exportTable (name, full) {
            if (!name) {
                return;
            }

            this.$emit(
                'export',
                {
                    fields: [
                        {
                            label: '#',
                            field: '_order',
                        },
                        ...this.exportFields(),
                    ],
                    data: this.exportData(full ? this.loadedRows : this.sortedRows, full),
                    title: name,
                }
            );
        },

        exportFields () {
            let temp = JSON.parse(JSON.stringify(this.exportColumns));

            temp.forEach((obj, i) => {
                let row = {};
                if(obj.dataFormat) {
                    row = {
                        label: obj.title,
                        field: obj.property,
                        dataFormat: obj.dataFormat,
                    };
                } else {
                    row = {
                        label: obj.title,
                        field: obj.property,
                    };
                }
                
                temp[i] = row;
            });

            return temp;
        },

        exportData (rows, full, parent = '') {
            return rows
                .reduce((exportRows, row, index) => {
                    let order = parent + (index + 1).toString();
                    row._order = order + (parent === '' ? '-0' : '');
                    return exportRows.concat([
                        row,
                        ...(full ?
                            (row && row._children ? this.exportData(row._children, full, order + '-') : []) :
                            (row && row._showChildren ? this.exportData(row._meta.visibleChildren, full, order + '-') : [])
                        ),
                    ]);
                }, []);
        },
    },
};
