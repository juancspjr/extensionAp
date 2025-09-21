console.log('🧠 WebScraping Intelligence Suite v3.3.0 - CONNECTION MONITOR + PARSEO CORREGIDO');

const analyzeBtn = document.getElementById('analyzeBtn');
const downloadBtn = document.getElementById('downloadBtn');
const connectionBtn = document.getElementById('connectionBtn');
const status = document.getElementById('status');
const connectionStatus = document.getElementById('connectionStatus');
const analysisResults = document.getElementById('analysisResults');

let lastAnalysisResults = null;
let connectionMonitorActive = false;
let connectionData = null;

// ACTUALIZAR STATUS MEJORADO
function updateStatus(message, type = 'info') {
    if (!status) return;
    
    status.textContent = message;
    status.className = `status ${type}`;
    
    // Añadir animación de actualización
    status.style.transform = 'scale(0.98)';
    setTimeout(() => {
        status.style.transform = 'scale(1)';
    }, 150);
}

// ACTUALIZAR STATUS DE CONEXIÓN - CORREGIDO v3.3.0
function updateConnectionStatus(message, isActive = false) {
    if (!connectionStatus) return;
    
    connectionStatus.textContent = message;
    connectionStatus.className = `connection-status ${isActive ? 'active' : 'inactive'}`;
    
    connectionStatus.style.transform = 'scale(0.98)';
    setTimeout(() => {
        connectionStatus.style.transform = 'scale(1)';
    }, 150);
}

// CREAR BARRA DE CONFIANZA MEJORADA
function createConfidenceBar(confidence, label = '') {
    const container = document.createElement('div');
    container.style.margin = '8px 0';

    if (label) {
        const labelElement = document.createElement('div');
        labelElement.textContent = label;
        labelElement.style.fontSize = '11px';
        labelElement.style.color = '#6c757d';
        labelElement.style.marginBottom = '4px';
        container.appendChild(labelElement);
    }

    const bar = document.createElement('div');
    bar.className = 'confidence-bar';
    
    const fill = document.createElement('div');
    fill.className = 'confidence-fill';
    fill.style.width = `${Math.min(confidence * 100, 100)}%`;
    bar.appendChild(fill);
    
    container.appendChild(bar);

    const percentage = document.createElement('div');
    percentage.textContent = `${Math.round(confidence * 100)}%`;
    percentage.style.fontSize = '10px';
    percentage.style.textAlign = 'center';
    percentage.style.color = '#495057';
    percentage.style.fontWeight = 'bold';
    container.appendChild(percentage);

    return container;
}

// MOSTRAR RESULTADOS MEJORADOS CON DATOS DE CONEXIÓN
function displayAnalysisResults(results) {
    if (!results) {
        analysisResults.innerHTML = '<div class="alert alert-warning">No hay análisis disponible</div>';
        return;
    }

    const statusColors = {
        'EXCELLENT': '#28a745',
        'GOOD': '#28a745', 
        'LIMITED': '#ffc107',
        'BASIC': '#fd7e14',
        'INSUFFICIENT': '#dc3545'
    };

    const currentColor = statusColors[results.overallStatus] || '#6c757d';
    const synthesis = results.synthesis?.combined?.data || results.synthesis?.synthesis;
    const agentResults = results.agentResults;
    const reportAvailable = results.professionalReport?.success;
    const metrics = results.metrics || results.improvementMetrics;
    const connectionInfo = results.connectionData;

    // Calcular estadísticas de agentes MEJORADAS - CORREGIDO v3.3.0
    const agentStats = agentResults ? Object.entries(agentResults).map(([name, result]) => {
        return {
            name: name,
            deepseekSuccess: result.dualAnalysis?.deepseek?.apiCall && result.dualAnalysis?.deepseek?.parsing,
            geminiSuccess: result.dualAnalysis?.gemini?.apiCall && result.dualAnalysis?.gemini?.parsing,
            confidence: result.combined?.confidence || 0,
            consensus: result.combined?.consensus || result.combined?.agreement?.status || 'unknown'
        };
    }) : [];

    const reportHtml = `
        <div class="analysis-header" style="background: linear-gradient(135deg, ${currentColor}20, ${currentColor}10); padding: 20px; border-radius: 12px; margin-bottom: 20px; border-left: 5px solid ${currentColor};">
            <h3 style="margin: 0; color: ${currentColor}; display: flex; align-items: center; gap: 10px;">
                <span style="font-size: 24px;">🚀</span>
                Análisis WebScraping Suite v3.3.0
                <span class="status-badge" style="background: ${currentColor}; color: white; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: bold;">
                    ${results.overallStatus}
                </span>
            </h3>
            <p style="margin: 8px 0 0 0; color: #666; font-size: 14px;">
                📊 Análisis Multi-Agente con Connection Monitor | ⏱️ ${Math.round(results.executionTime / 1000)}s
            </p>
        </div>

        <!-- MÉTRICAS PRINCIPALES CORREGIDAS -->
        <div class="metrics-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-bottom: 25px;">
            
            <div class="metric-card" style="background: #f8f9fa; padding: 15px; border-radius: 8px; border-left: 4px solid #007bff;">
                <h4 style="margin: 0 0 8px 0; color: #007bff; font-size: 14px;">📈 APIs Detectadas</h4>
                <div style="font-size: 24px; font-weight: bold; color: #333;">
                    ${metrics?.totalApiCalls || connectionInfo?.totalConnections || 'N/A'}
                </div>
                <div style="font-size: 12px; color: #666;">
                    Llamadas exitosas: ${metrics?.successfulApiCalls || 'N/A'}
                </div>
            </div>

            <div class="metric-card" style="background: #f8f9fa; padding: 15px; border-radius: 8px; border-left: 4px solid #28a745;">
                <h4 style="margin: 0 0 8px 0; color: #28a745; font-size: 14px;">🎯 Confianza Promedio</h4>
                <div style="font-size: 24px; font-weight: bold; color: #333;">
                    ${Math.round((metrics?.avgConfidence || 0) * 100)}%
                </div>
                <div style="font-size: 12px; color: #666;">
                    Tasa de éxito: ${Math.round((metrics?.parseSuccessRate || 0) * 100)}%
                </div>
            </div>

            <div class="metric-card" style="background: #f8f9fa; padding: 15px; border-radius: 8px; border-left: 4px solid #6f42c1;">
                <h4 style="margin: 0 0 8px 0; color: #6f42c1; font-size: 14px;">🤖 Agentes Activos</h4>
                <div style="font-size: 24px; font-weight: bold; color: #333;">
                    ${agentStats.length}
                </div>
                <div style="font-size: 12px; color: #666;">
                    Consenso alto: ${agentStats.filter(a => a.consensus === 'high').length}
                </div>
            </div>

            <div class="metric-card" style="background: #f8f9fa; padding: 15px; border-radius: 8px; border-left: 4px solid #fd7e14;">
                <h4 style="margin: 0 0 8px 0; color: #fd7e14; font-size: 14px;">🔗 Conexiones Monitor</h4>
                <div style="font-size: 24px; font-weight: bold; color: #333;">
                    ${connectionInfo?.totalConnections || 0}
                </div>
                <div style="font-size: 12px; color: #666;">
                    Dominios únicos: ${connectionInfo?.summary?.unique_domains?.length || 0}
                </div>
            </div>
        </div>

        <!-- INFORMACIÓN DE CONEXIONES -->
        ${connectionInfo ? `
        <div class="connection-info" style="background: linear-gradient(135deg, #007bff20, #007bff10); padding: 15px; border-radius: 8px; margin-bottom: 20px;">
            <h4 style="margin: 0 0 10px 0; color: #007bff;">🔗 Datos de Connection Monitor</h4>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 10px; font-size: 13px;">
                <div><strong>Sesión ID:</strong> ${connectionInfo.sessionId || 'N/A'}</div>
                <div><strong>Duración:</strong> ${Math.round((connectionInfo.duration || 0) / 1000)}s</div>
                <div><strong>API Calls:</strong> ${connectionInfo.connections?.filter(c => c.type === 'api_call')?.length || 0}</div>
                <div><strong>Requests de Red:</strong> ${connectionInfo.networkRequests?.length || 0}</div>
            </div>
        </div>
        ` : ''}

        <!-- ESTADO DE AGENTES CORREGIDO -->
        <div class="agents-section" style="margin-bottom: 25px;">
            <h4 style="margin: 0 0 15px 0; color: #333;">🤖 Estado de Agentes Multi-AI</h4>
            <div class="agents-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 12px;">
                ${agentStats.map(agent => `
                    <div class="agent-card" style="background: #fff; padding: 12px; border: 1px solid #e9ecef; border-radius: 6px;">
                        <div style="display: flex; justify-content: between; align-items: center; margin-bottom: 8px;">
                            <h5 style="margin: 0; color: #333; font-size: 13px; text-transform: capitalize;">
                                ${agent.name.replace(/([A-Z])/g, ' $1').trim()}
                            </h5>
                            <span style="background: ${agent.consensus === 'high' ? '#28a745' : agent.consensus === 'medium' ? '#ffc107' : '#6c757d'}; color: white; padding: 2px 6px; border-radius: 10px; font-size: 10px;">
                                ${agent.consensus.toUpperCase()}
                            </span>
                        </div>
                        <div style="display: flex; gap: 8px; margin-bottom: 8px; font-size: 11px;">
                            <span style="color: ${agent.deepseekSuccess ? '#28a745' : '#dc3545'};">
                                DeepSeek: ${agent.deepseekSuccess ? '✅' : '❌'}
                            </span>
                            <span style="color: ${agent.geminiSuccess ? '#28a745' : '#dc3545'};">
                                Gemini: ${agent.geminiSuccess ? '✅' : '❌'}
                            </span>
                        </div>
                        ${createConfidenceBar(agent.confidence).outerHTML}
                    </div>
                `).join('')}
            </div>
        </div>

        <!-- SÍNTESIS DEL ANÁLISIS -->
        ${synthesis ? `
        <div class="synthesis-section" style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h4 style="margin: 0 0 15px 0; color: #333;">📋 Síntesis del Análisis</h4>
            <div style="font-size: 14px; line-height: 1.6; color: #555;">
                ${typeof synthesis === 'string' ? synthesis : JSON.stringify(synthesis, null, 2)}
            </div>
        </div>
        ` : ''}

        <!-- REPORTE PROFESIONAL -->
        ${reportAvailable ? `
        <div class="report-section" style="background: linear-gradient(135deg, #28a74520, #28a74510); padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h4 style="margin: 0 0 15px 0; color: #28a745;">📄 Reporte Profesional Generado</h4>
            <p style="margin: 0 0 15px 0; color: #666; font-size: 14px;">
                Se ha generado un reporte técnico profesional basado en el análisis multi-agente.
            </p>
            <button onclick="downloadReport()" style="background: #28a745; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; font-size: 14px;">
                📥 Descargar Reporte
            </button>
        </div>
        ` : ''}

        <!-- MÉTRICAS TÉCNICAS DETALLADAS -->
        <div class="technical-metrics" style="background: #fff; border: 1px solid #e9ecef; border-radius: 8px; padding: 15px;">
            <h4 style="margin: 0 0 15px 0; color: #333;">⚙️ Métricas Técnicas</h4>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; font-size: 13px;">
                <div>
                    <strong>Modelo Gemini:</strong> ${metrics?.geminiModelUsed || 'N/A'}<br>
                    <strong>Fallbacks:</strong> ${metrics?.fallbacksUsed || 0}<br>
                    <strong>Tiempo total:</strong> ${Math.round(results.executionTime / 1000)}s
                </div>
                <div>
                    <strong>Cookies analizadas:</strong> ${results.cookies?.totalCookies || 0}<br>
                    <strong>DOM elements:</strong> ${results.domData?.structure?.totalElements || 0}<br>
                    <strong>Scripts detectados:</strong> ${results.domData?.scripts?.total || 0}
                </div>
            </div>
        </div>
    `;

    analysisResults.innerHTML = reportHtml;
}

// FUNCIÓN PARA DESCARGAR REPORTE
function downloadReport() {
    if (lastAnalysisResults?.professionalReport?.combined?.data) {
        const reportText = typeof lastAnalysisResults.professionalReport.combined.data === 'string' 
            ? lastAnalysisResults.professionalReport.combined.data
            : JSON.stringify(lastAnalysisResults.professionalReport.combined.data, null, 2);
            
        const blob = new Blob([reportText], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `webscraping-report-${Date.now()}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
}

// EVENT LISTENERS CORREGIDOS v3.3.0

// BOTÓN ANALIZAR
if (analyzeBtn) {
    analyzeBtn.addEventListener('click', async () => {
        if (analyzeBtn.disabled) return;
        
        try {
            analyzeBtn.disabled = true;
            analyzeBtn.textContent = '🔄 Analizando...';
            updateStatus('Iniciando análisis multi-agente v3.3.0...', 'info');

            // Obtener tab activo
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            if (!tab) {
                throw new Error('No se pudo obtener la pestaña activa');
            }

            // Ejecutar análisis con datos de conexión
            const response = await chrome.runtime.sendMessage({
                action: 'runAnalysis',
                tabId: tab.id,
                connectionData: connectionData // Pasar datos de conexión si están disponibles
            });

            if (response.success) {
                lastAnalysisResults = response.data;
                displayAnalysisResults(response.data);
                updateStatus(`✅ Análisis completado - Estado: ${response.data.overallStatus}`, 'success');
                
                if (downloadBtn) {
                    downloadBtn.disabled = false;
                    downloadBtn.style.opacity = '1';
                }
            } else {
                throw new Error(response.error || 'Error desconocido');
            }

        } catch (error) {
            console.error('Error en análisis:', error);
            updateStatus(`❌ Error: ${error.message}`, 'error');
            analysisResults.innerHTML = `
                <div class="alert alert-danger">
                    <h4>Error en el Análisis</h4>
                    <p>${error.message}</p>
                    <small>Verifica que estés en una página web válida y que la extensión tenga los permisos necesarios.</small>
                </div>
            `;
        } finally {
            analyzeBtn.disabled = false;
            analyzeBtn.textContent = '🚀 Iniciar Análisis Multi-Agente';
        }
    });
}

// BOTÓN CONNECTION MONITOR - CORREGIDO v3.3.0
if (connectionBtn) {
    connectionBtn.addEventListener('click', async () => {
        if (connectionBtn.disabled) return;

        try {
            connectionBtn.disabled = true;

            if (!connectionMonitorActive) {
                // INICIAR MONITOR
                updateConnectionStatus('Iniciando monitor de conexiones v3.3.0...', true);
                
                const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
                if (!tab) {
                    throw new Error('No se pudo obtener la pestaña activa');
                }

                const result = await chrome.runtime.sendMessage({ 
                    action: 'startConnectionMonitor',
                    tabId: tab.id
                });

                if (result.success) {
                    connectionMonitorActive = true;
                    connectionBtn.textContent = '🛑 Detener Monitor';
                    connectionBtn.className = 'btn btn-danger';
                    
                    // CORRECCIÓN CRÍTICA: Validación de result.status
                    updateConnectionStatus(`Monitor activo - Sesión ${result.status?.sessionId || 'unknown'}`, true);
                    
                    // Iniciar verificación de estado
                    startStatusMonitoring();
                } else {
                    throw new Error(result.error || 'No se pudo iniciar el monitor');
                }

            } else {
                // DETENER MONITOR
                updateConnectionStatus('Deteniendo monitor...', false);
                
                const result = await chrome.runtime.sendMessage({ 
                    action: 'stopConnectionMonitor'
                });

                if (result.success) {
                    connectionMonitorActive = false;
                    connectionBtn.textContent = '🔗 Iniciar Monitor de Conexiones';
                    connectionBtn.className = 'btn btn-primary';
                    
                    connectionData = result.sessionData;
                    
                    // CORRECCIÓN CRÍTICA: Validación de connectionData
                    if (connectionData && connectionData.totalConnections !== undefined) {
                        updateConnectionStatus(`Sesión completada - ${connectionData.totalConnections} conexiones capturadas en ${Math.round((connectionData.duration || 0) / 1000)}s`, false);
                    } else {
                        updateConnectionStatus('Sesión completada - datos no disponibles', false);
                    }
                    
                    stopStatusMonitoring();
                    
                    console.log('📊 Datos de conexión capturados:', connectionData);
                } else {
                    throw new Error(result.error || 'No se pudo detener el monitor');
                }
            }

        } catch (error) {
            console.error('Error en connection monitor:', error);
            updateConnectionStatus(`❌ Error: ${error.message}`, false);
            connectionMonitorActive = false;
            connectionBtn.textContent = '🔗 Iniciar Monitor de Conexiones';
            connectionBtn.className = 'btn btn-primary';
        } finally {
            connectionBtn.disabled = false;
        }
    });
}

// MONITOREO DE ESTADO MEJORADO - CORREGIDO v3.3.0
let statusInterval;

function startStatusMonitoring() {
    statusInterval = setInterval(async () => {
        try {
            const statusResult = await chrome.runtime.sendMessage({ 
                action: 'getConnectionStatus'
            });

            // CORRECCIÓN CRÍTICA: Validación de statusResult.status
            if (statusResult.success && statusResult.status?.isActive) {
                if (statusResult.status && statusResult.status.connectionsCount !== undefined) {
                    updateConnectionStatus(`Monitor activo - ${statusResult.status.connectionsCount} conexiones ${Math.round((statusResult.status.duration || 0) / 1000)}s`, true);
                } else {
                    updateConnectionStatus('Monitor activo - estado no disponible', true);
                }
            } else {
                // Monitor se detuvo inesperadamente
                connectionMonitorActive = false;
                connectionBtn.textContent = '🔗 Iniciar Monitor de Conexiones';
                connectionBtn.className = 'btn btn-primary';
                connectionBtn.disabled = false;
                updateConnectionStatus('Monitor detenido', false);
                stopStatusMonitoring();
            }
        } catch (error) {
            console.error('Error verificando estado:', error);
        }
    }, 2000);
}

function stopStatusMonitoring() {
    if (statusInterval) {
        clearInterval(statusInterval);
        statusInterval = null;
    }
}

// BOTÓN DESCARGAR
if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
        if (!lastAnalysisResults) {
            updateStatus('❌ No hay análisis para descargar', 'error');
            return;
        }

        try {
            const dataStr = JSON.stringify(lastAnalysisResults, null, 2);
            const blob = new Blob([dataStr], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            
            const a = document.createElement('a');
            a.href = url;
            a.download = `webscraping-analysis-${Date.now()}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            updateStatus('✅ Análisis descargado exitosamente', 'success');
        } catch (error) {
            console.error('Error descargando:', error);
            updateStatus('❌ Error al descargar análisis', 'error');
        }
    });
}

// CARGAR ÚLTIMO ANÁLISIS AL ABRIR POPUP
document.addEventListener('DOMContentLoaded', async () => {
    console.log('🧠 WebScraping Intelligence Suite v3.3.0 Popup cargado');
    
    try {
        // Verificar estado del connection monitor
        const statusResult = await chrome.runtime.sendMessage({ 
            action: 'getConnectionStatus'
        });

        // CORRECCIÓN CRÍTICA: Validación completa de statusResult
        if (statusResult.success && statusResult.status?.isActive) {
            connectionMonitorActive = true;
            connectionBtn.textContent = '🛑 Detener Monitor';
            connectionBtn.className = 'btn btn-danger';
            
            if (statusResult.status && statusResult.status.connectionsCount !== undefined) {
                updateConnectionStatus(`Monitor activo - ${statusResult.status.connectionsCount} conexiones`, true);
            } else {
                updateConnectionStatus('Monitor activo - estado no disponible', true);
            }
            
            startStatusMonitoring();
        }

        // Cargar último análisis si existe
        const response = await chrome.runtime.sendMessage({ 
            action: 'getLastAnalysis'
        });

        if (response.success && response.data) {
            lastAnalysisResults = response.data;
            displayAnalysisResults(response.data);
            updateStatus('Último análisis cargado', 'info');
            
            if (downloadBtn) {
                downloadBtn.disabled = false;
                downloadBtn.style.opacity = '1';
            }
        } else {
            updateStatus('WebScraping Intelligence Suite v3.3.0 listo', 'success');
        }

    } catch (error) {
        console.error('Error inicializando popup:', error);
        updateStatus('⚠️ Extensión cargada con advertencias', 'warning');
    }
});

// CLEANUP AL CERRAR POPUP
window.addEventListener('beforeunload', () => {
    stopStatusMonitoring();
});

console.log('✅ WebScraping Intelligence Suite v3.3.0 Popup inicializado correctamente');