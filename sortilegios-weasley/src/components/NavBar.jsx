const NavBar = () => {
    return (
        <nav class="navbar navbar-expand-lg">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">
                    <img src="/logo192.png" alt="Logo de Sortilegios Weasley" width="30" height="24"/>
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse bg-body-secondary rounded-2 px-5" id="navbarNav">
                    <ul class="nav nav-pills">
                        <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">Home</a>
                        </li>
                        <li class="nav-item">
                        <a class="nav-link" href="#">Features</a>
                        </li>
                        <li class="nav-item">
                        <a class="nav-link" href="#">Pricing</a>
                        </li>
                        <li class="nav-item">
                        <a class="nav-link disabled" aria-disabled="true">Disabled</a>
                        </li>
                    </ul>
                </div>
                <div class="px-3">
                    <button type="button" class="btn btn-primary mx-1">Iniciar Sesión</button>
                    <button type="button" class="btn btn-primary mx-1">Carrito</button>
                </div>
            </div>
        </nav>
    )
}

export default NavBar