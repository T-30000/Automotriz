const express = require('express');
const path = require('path');
const router = express.Router();

// Middleware para verificar la sesión del usuario
const checkSession = (req, res, next) => {
    if (req.session.numeroUser && req.session.estadoUser) {
        next();
    } else {
        res.redirect('/login');
    }
};

// Middleware para verificar roles específicos
const checkRole = (role) => {
    return (req, res, next) => {
        if (req.session.puestoUser === role) {
            next();
        } else {
            res.status(403).json({ error: 'Acceso denegado. No tienes permisos suficientes.' });
        }
    };
};

// Rutas para 'Otras_vistas'
router.get('/empleado/contratar', checkSession, (req, res) => {
    const { estadoUser, puestoUser } = req.session;

    if (estadoUser === 'Activo' || estadoUser === 'Empleado') {
        if (puestoUser === 'Cliente') {
            return res.sendFile(path.join(__dirname, 'public/html/forms/Autorizar.html'));
        }
        if (puestoUser === 'Gerente') {
            return res.sendFile(path.join(__dirname, 'public/html/gerente/EmpleadoContratar.html'));
        }
        if (puestoUser === 'Asesor' || puestoUser === 'Secretaria' || puestoUser === 'Vendedor') {
            return res.sendFile(path.join(__dirname, 'public/html/gerente/EmpleadoContratar.html'));
        }
    } else if (estadoUser === 'Baja' || estadoUser === 'Despedido' || estadoUser === 'Renuncia') {
        return res.sendFile(path.join(__dirname, 'public/html/Autorizar.html'));
    } else {
        return res.sendFile(path.join(__dirname, 'public/html/LoginE.html'));
    }
});

// Ruta de login para empleados
router.get('/login-empleado', (req, res) => {
    if (req.session.numeroUser) {
        res.redirect('/dashboard');
    } else {
        res.sendFile(path.join(__dirname, 'public/html/LoginE.html'));
    }
});

// Ruta de login para clientes
router.get('/login-cliente', (req, res) => {
    if (req.session.numeroUser) {
        res.redirect('/dashboard');
    } else {
        res.sendFile(path.join(__dirname, 'public/html/LoginC.html'));
    }
});

// Ruta de despedir
router.get('/despedir', checkSession, (req, res) => {
    const { estadoUser, puestoUser } = req.session;

    if (estadoUser === 'Activo' || estadoUser === 'Empleado') {
        if (puestoUser === 'Cliente') {
            return res.sendFile(path.join(__dirname, 'public/html/Autorizar.html'));
        }
        if (puestoUser === 'Gerente') {
            return res.sendFile(path.join(__dirname, 'public/html/gerente/EmpleadoContratar.html'));
        }
        if (puestoUser === 'Asesor' || puestoUser === 'Secretaria' || puestoUser === 'Vendedor') {
            return res.sendFile(path.join(__dirname, 'public/html/Autorizar.html'));
        }
    } else if (estadoUser === 'Baja' || estadoUser === 'Despedido' || estadoUser === 'Renuncia') {
        return res.sendFile(path.join(__dirname, 'public/html/Autorizar.html'));
    } else {
        return res.sendFile(path.join(__dirname, 'public/html/LoginE.html'));
    }
});

// Ruta para manejar rutas no encontradas
router.use((req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

module.exports = router;
