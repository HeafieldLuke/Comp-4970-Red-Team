import './modal.css'

const Modal = ({ isVisible, setVisible, deleteCallback}) => {

    if (!isVisible) {
        return null
    }

    return (
        <div id="id01" className="modal">
            <form className="modal-content" action="/action_page.php">
                <div className="modal-container">
                <h1>Delete Entry</h1>
                <p>Are you sure you want to delete this entry</p>
            
                <div class="clearfix">
                    <button type="button" onClick={() => setVisible()} className="cancelbtn">Cancel</button>
                    <button type="button" onClick={() => { deleteCallback(); setVisible() }} className="deletebtn">Delete</button>
                </div>
                </div>
            </form>
        </div>
    )
}

export default Modal;