import HeaderCell from "./HeaderCell"

const Header = ({columns, sorting, sortTable}:any) => {
    return (
        <thead>
            <tr>
                {columns.map((column:any) =>(
                    <HeaderCell 
                        column={column} 
                        sorting={sorting}
                        key={column}
                        sortTable={sortTable}
                    />
                ))}
            <th colSpan={3}>Actions</th>
            </tr>
        </thead>
    )
}
export default Header
