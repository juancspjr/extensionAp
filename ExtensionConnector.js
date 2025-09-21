// ExtensionConnector.js - CÓDIGO COMPLETO CON TU ID
import React, { useState, useEffect } from 'react';

export const ExtensionConnector = ({ onConnectionSuccess }) => {
  const [extensionReady, setExtensionReady] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [cookiesData, setCookiesData] = useState(null);
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState(null);

  // Función para agregar logs
  const addLog = (level, message, details = null) => {
    const newLog = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      level,
      message,
      details
    };
    
    setLogs(prev => [...prev.slice(-49), newLog]); // Mantener últimos 50
    console.log(`${level.toUpperCase()}: ${message}`, details || '');
  };

  // Función para verificar extensión
  const checkExtensionCookies = async () => {
    addLog('info', 'Verificando cookies en extensión...');
    
    try {
      const extensionId = 'fbjdjkiloljkafehandlafajibeoihmn'; // TU ID
      
      const response = await chrome.runtime.sendMessage(extensionId, {
        action: 'getCookiesFromStorage'
      });
      
      if (response && response.success) {
        addLog('success', `Cookies obtenidas: ${response.data.totalCookies} total`);
        setCookiesData(response.data);
        setExtensionReady(true);
        setError(null);
        
        if (onConnectionSuccess) {
          try {
            await onConnectionSuccess(response.data.cookieString);
            setIsConnected(true);
            addLog('success', 'Conexión exitosa con Gemini Web');
          } catch (error) {
            addLog('error', 'Error conectando con Gemini Web', error.message);
            setError(error.message);
          }
        }
      } else {
        addLog('warning', 'No hay cookies disponibles en la extensión');
        setExtensionReady(true);
        setError('No se encontraron cookies. Extrae cookies desde la extensión primero.');
      }
      
    } catch (error) {
      addLog('error', 'Extensión no disponible o no instalada');
      setExtensionReady(false);
      setError('Extensión no instalada o no funcional');
    }
  };

  // Verificar extensión al cargar
  useEffect(() => {
    addLog('info', 'Componente ExtensionConnector iniciado');
    checkExtensionCookies();
  }, []);

  const clearLogs = () => {
    setLogs([]);
    addLog('info', 'Logs limpiados');
  };

  const refreshConnection = () => {
    addLog('info', 'Refrescando estado de conexión...');
    setError(null);
    checkExtensionCookies();
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {/* HEADER */}
      <h2 className="text-xl font-bold mb-4 text-gray-800">
        🚀 Conexión de Generación Ilimitada (Opcional vía Extensión)
      </h2>
      
      <p className="text-gray-600 mb-6">
        Conecta la extensión de Chrome para habilitar la generación de imágenes ilimitada 
        y gratuita a través de la API web de Gemini. Esto anulará el uso de las claves de API oficiales.
      </p>

      {/* LAYOUT DE 2 COLUMNAS */}
      <div className="grid lg:grid-cols-2 gap-6">
        
        {/* PANEL PRINCIPAL (IZQUIERDA) */}
        <div className="space-y-4">
          
          {/* BOTÓN PRINCIPAL */}
          <button 
            onClick={refreshConnection}
            disabled={!extensionReady}
            className={`w-full py-3 px-4 rounded-lg font-medium ${
              isConnected 
                ? 'bg-green-600 text-white cursor-default' 
                : extensionReady 
                  ? 'bg-blue-600 text-white hover:bg-blue-700' 
                  : 'bg-gray-400 text-gray-200 cursor-not-allowed'
            }`}
          >
            {isConnected ? '✅ Conectado con Extensión' : '🔐 Conectar con Extensión'}
          </button>

          {/* INDICADOR DE ESTADO */}
          <div className="flex items-center space-x-3">
            <div className={`w-3 h-3 rounded-full ${
              isConnected ? 'bg-green-500' : 
              extensionReady ? 'bg-yellow-500' : 'bg-red-500'
            }`}></div>
            <span className="text-sm font-medium">
              {isConnected ? '🟢 Conectado' : 
               extensionReady ? '🟡 Extensión lista, no conectada' : '🔴 Extensión no detectada'}
            </span>
          </div>

          {/* INFORMACIÓN */}
          <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Estado:</span>
              <span className="font-medium">{isConnected ? 'Conectado' : 'No conectado'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Cookies detectadas:</span>
              <span className="font-medium">{cookiesData ? cookiesData.totalCookies : 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Última conexión:</span>
              <span className="font-medium">
                {cookiesData ? new Date(cookiesData.timestamp).toLocaleTimeString() : 'N/A'}
              </span>
            </div>
          </div>

          {/* BOTÓN REFRESCAR */}
          <button 
            onClick={refreshConnection}
            className="w-full py-2 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm"
          >
            🔄 Refrescar Estado
          </button>

          {/* ERROR */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-sm">
              ❌ {error}
            </div>
          )}

          {/* INSTRUCCIONES */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm">
            <strong className="text-blue-800">Instrucciones:</strong>
            <ol className="list-decimal list-inside mt-2 space-y-1 text-blue-700">
              <li>Abre gemini.google.com y haz login</li>
              <li>Abre el popup de la extensión Story Builder</li>
              <li>Haz click en "🍪 Extraer Cookies"</li>
              <li>Vuelve aquí y haz click en "🔐 Conectar con Extensión"</li>
            </ol>
          </div>
        </div>

        {/* PANEL DE LOGS (DERECHA) */}
        <div className="space-y-4">
          
          {/* HEADER DE LOGS */}
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-gray-800">📝 Logs del Sistema</h3>
            <button 
              onClick={clearLogs}
              className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded hover:bg-red-200"
            >
              🗑️ Limpiar
            </button>
          </div>

          {/* ÁREA DE LOGS */}
          <div className="bg-gray-900 text-gray-100 rounded-lg p-4 h-96 overflow-y-auto font-mono text-xs">
            {logs.length === 0 ? (
              <div className="text-gray-400 text-center py-8">
                No hay logs aún...
              </div>
            ) : (
              logs.map(log => (
                <div key={log.id} className="mb-2">
                  <div className="flex items-start space-x-2">
                    <span className="text-gray-400 text-xs">
                      {new Date(log.timestamp).toLocaleTimeString()}
                    </span>
                    <span className={`text-xs font-medium ${
                      log.level === 'error' ? 'text-red-400' :
                      log.level === 'warning' ? 'text-yellow-400' :
                      log.level === 'success' ? 'text-green-400' :
                      'text-blue-400'
                    }`}>
                      {log.level.toUpperCase()}
                    </span>
                    <span className="text-gray-100 flex-1">{log.message}</span>
                  </div>
                  {log.details && (
                    <div className="text-gray-400 text-xs ml-16 mt-1">
                      {JSON.stringify(log.details)}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExtensionConnector;
