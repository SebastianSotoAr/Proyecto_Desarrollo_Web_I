const Filter = () => {
    return (
        <form class="mx-5">
            <div class="my-5">
                <div class="form-check mb-3">
                    <input class="form-check-input" type="checkbox" value="" id="checkDefault"/>
                    <label class="form-check-label" for="checkDefault">
                        <h6>Label</h6>
                        description 
                    </label>
                </div>
                <div class="form-check mb-3">
                    <input class="form-check-input" type="checkbox" value="" id="checkDefault"/>
                    <label class="form-check-label" for="checkDefault">
                        <h6>Label</h6>
                        description 
                    </label>
                </div>
                <div class="form-check mb-3">
                    <input class="form-check-input" type="checkbox" value="" id="checkDefault"/>
                    <label class="form-check-label" for="checkDefault">
                        <h6>Label</h6>
                        description 
                    </label>
                </div>
            </div>

            <div class="my-5">
                <label for="customRange2" class="form-label">
                    <div class="d-flex mb-3">
                        <div class="p-2">Label</div>
                        <div class="p-2">$0-100</div>
                    </div>
                </label>
                <input type="range" class="form-range" min="0" max="100" id="customRange2"></input>
            </div>

            <div class="my-5">
                <h6>Color</h6>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="checkDefault"/>
                    <label class="form-check-label" for="checkDefault">
                        Label
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="checkDefault"/>
                    <label class="form-check-label" for="checkDefault">
                        Label
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="checkDefault"/>
                    <label class="form-check-label" for="checkDefault">
                        Label
                    </label>
                </div>
            </div>

            <div class="my-5">
                <h6>Size</h6>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="checkDefault"/>
                    <label class="form-check-label" for="checkDefault">
                        Label
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="checkDefault"/>
                    <label class="form-check-label" for="checkDefault">
                        Label
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="checkDefault"/>
                    <label class="form-check-label" for="checkDefault">
                        Label
                    </label>
                </div>
            </div>
        </form>
    )
}
export default Filter