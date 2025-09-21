console.log('🧠 WEBSCRAPING INTELLIGENCE SUITE: Content script v3.1.1 - SOPORTE CORREGIDO');

// Content script mejorado para soporte del sistema multi-agente v3.1.1 CORREGIDO
// Proporciona helpers optimizados y pre-análisis para la extracción robusta

// CLASE: Pre-Analyzer corregido para v3.1.1
class ContentPreAnalyzer {
  constructor() {
    this.preAnalysisData = {
      timestamp: Date.now(),
      version: '3.1.1',
      url: window.location.href,
      readyState: document.readyState,
      improvements: {
        robustParsing: true,
        parallelization: true,
        autoRecovery: true,
        tripleAI: true
      },
      helpers: {
        installed: false,
        functions: []
      }
    };
    
    this.initialize();
  }

  // INICIALIZAR CON MEJORAS v3.1.1 CORREGIDAS
  initialize() {
    console.log('🔍 CONTENT PRE-ANALYZER: Inicializando v3.1.1 corregido...');
    
    try {
      this.installEnhancedHelpers();
      this.performRobustAnalysis();
      this.setupImprovedObservers();
      this.notifyBackgroundWithMetrics();
      
      console.log('✅ CONTENT PRE-ANALYZER: v3.1.1 inicializado correctamente');
    } catch (error) {
      console.error('❌ CONTENT PRE-ANALYZER: Error en inicialización:', error);
    }
  }

  // INSTALAR HELPERS MEJORADOS Y CORREGIDOS
  installEnhancedHelpers() {
    console.log('🛠️ CONTENT: Instalando helpers v3.1.1...');
    
    try {
      // Helper mejorado: Buscar elementos con recuperación automática
      window.findByTextRobust = function(text, tag = '*', options = {}) {
        try {
          const elements = Array.from(document.querySelectorAll(tag));
          const results = elements.filter(el => {
            try {
              const textContent = el.textContent || '';
              const innerText = el.innerText || '';
              const ariaLabel = el.ariaLabel || '';
              const title = el.title || '';
              
              const searchText = text.toLowerCase();
              return textContent.toLowerCase().includes(searchText) ||
                     innerText.toLowerCase().includes(searchText) ||
                     ariaLabel.toLowerCase().includes(searchText) ||
                     title.toLowerCase().includes(searchText);
            } catch (elementError) {
              return false;
            }
          });
          
          return {
            success: true,
            results: results,
            count: results.length,
            searchTerm: text
          };
        } catch (error) {
          console.error('Error in findByTextRobust:', error);
          return {
            success: false,
            results: [],
            count: 0,
            error: error.message,
            searchTerm: text
          };
        }
      };

      // Helper mejorado: Análisis robusto de scripts CORREGIDO
      window.analyzeScriptsRobust = function() {
        try {
          const scripts = Array.from(document.querySelectorAll('script'));
          const analysis = {
            success: true,
            total: scripts.length,
            results: [],
            categories: {
              api: 0,
              auth: 0,
              config: 0,
              suspicious: 0,
              external: 0,
              inline: 0
            }
          };
          
          scripts.forEach((script, index) => {
            try {
              const content = script.innerHTML || '';
              const src = script.src || '';
              
              const scriptInfo = {
                index: index,
                type: script.type || 'text/javascript',
                src: src,
                hasContent: content.length > 0,
                size: content.length,
                async: script.async || false,
                defer: script.defer || false,
                
                // Análisis robusto de contenido
                categories: {
                  api: /\b(api|endpoint|url|fetch|ajax|axios)\b/i.test(content + src),
                  auth: /\b(auth|login|token|session|bearer|jwt)\b/i.test(content + src),
                  config: /\b(config|settings|options|params)\b/i.test(content + src),
                  suspicious: /\b(eval|document\.write|innerHTML|base64|atob|btoa)\b/i.test(content + src)
                }
              };
              
              // Categorizar con manejo de errores
              Object.keys(scriptInfo.categories).forEach(category => {
                try {
                  if (scriptInfo.categories[category]) {
                    analysis.categories[category]++;
                  }
                } catch (catError) {
                  console.error(`Error categorizing script ${index}:`, catError);
                }
              });
              
              if (src) analysis.categories.external++;
              else analysis.categories.inline++;
              
              analysis.results.push(scriptInfo);
              
            } catch (scriptError) {
              console.error(`Error analyzing script ${index}:`, scriptError);
              analysis.results.push({
                index: index,
                error: scriptError.message,
                src: script.src || null
              });
            }
          });
          
          return analysis;
          
        } catch (error) {
          console.error('Error in analyzeScriptsRobust:', error);
          return {
            success: false,
            error: error.message,
            total: 0,
            results: [],
            categories: {}
          };
        }
      };

      // Helper para extracción robusta de patrones CORREGIDO
      window.extractPatternsRobust = function(text, pattern) {
        try {
          if (!text || typeof text !== 'string') {
            return {
              success: false,
              matches: [],
              count: 0,
              error: 'Invalid text input'
            };
          }
          
          const matches = text.match(pattern) || [];
          return {
            success: true,
            matches: matches.slice(0, 10), // Limitar a 10 para evitar sobrecarga
            count: matches.length
          };
        } catch (error) {
          return {
            success: false,
            matches: [],
            count: 0,
            error: error.message
          };
        }
      };

      // Helper mejorado: Storage con recuperación CORREGIDO
      window.extractStorageDataRobust = function() {
        const storage = {
          success: true,
          localStorage: { success: false, keys: {}, error: null, count: 0 },
          sessionStorage: { success: false, keys: {}, error: null, count: 0 },
          cookies: { success: false, parsed: {}, raw: '', error: null, count: 0 }
        };
        
        // LocalStorage robusto
        try {
          const localStorageKeys = Object.keys(localStorage);
          localStorageKeys.forEach(key => {
            try {
              const value = localStorage.getItem(key);
              storage.localStorage.keys[key] = {
                length: value ? value.length : 0,
                hasToken: /token|key|auth|jwt|bearer/i.test(key + value),
                sample: value ? value.substring(0, 100) + (value.length > 100 ? '...' : '') : null,
                type: window.detectValueType ? window.detectValueType(value) : 'unknown'
              };
            } catch (keyError) {
              storage.localStorage.keys[key] = { error: keyError.message };
            }
          });
          storage.localStorage.success = true;
          storage.localStorage.count = localStorageKeys.length;
        } catch (e) {
          storage.localStorage.error = e.message;
        }
        
        // SessionStorage robusto
        try {
          const sessionStorageKeys = Object.keys(sessionStorage);
          sessionStorageKeys.forEach(key => {
            try {
              const value = sessionStorage.getItem(key);
              storage.sessionStorage.keys[key] = {
                length: value ? value.length : 0,
                hasToken: /token|key|auth|jwt|bearer/i.test(key + value),
                sample: value ? value.substring(0, 100) + (value.length > 100 ? '...' : '') : null,
                type: window.detectValueType ? window.detectValueType(value) : 'unknown'
              };
            } catch (keyError) {
              storage.sessionStorage.keys[key] = { error: keyError.message };
            }
          });
          storage.sessionStorage.success = true;
          storage.sessionStorage.count = sessionStorageKeys.length;
        } catch (e) {
          storage.sessionStorage.error = e.message;
        }
        
        // Cookies robusto
        try {
          storage.cookies.raw = document.cookie;
          if (document.cookie) {
            const cookiePairs = document.cookie.split(';');
            cookiePairs.forEach(cookie => {
              try {
                const [name, ...valueParts] = cookie.trim().split('=');
                const value = valueParts.join('=');
                if (name) {
                  storage.cookies.parsed[name] = {
                    length: value ? value.length : 0,
                    hasToken: /token|key|auth|jwt|bearer|session|sid/i.test(name + value),
                    sample: value ? value.substring(0, 50) + (value.length > 50 ? '...' : '') : null
                  };
                }
              } catch (cookieError) {
                // Ignorar cookies individuales con errores
              }
            });
            storage.cookies.count = Object.keys(storage.cookies.parsed).length;
          }
          storage.cookies.success = true;
        } catch (e) {
          storage.cookies.error = e.message;
        }
        
        return storage;
      };

      // Helper para detectar tipo de valor CORREGIDO
      window.detectValueType = function(value) {
        if (!value) return 'empty';
        
        try {
          JSON.parse(value);
          return 'json';
        } catch (e) {
          if (/^[A-Za-z0-9+/=]+$/.test(value) && value.length % 4 === 0) {
            return 'base64';
          }
          if (/^[A-Fa-f0-9]+$/.test(value) && value.length >= 16) {
            return 'hex';
          }
          if (value.length > 50 && !/\s/.test(value)) {
            return 'token';
          }
          return 'string';
        }
      };

      // Registrar helpers instalados
      this.preAnalysisData.helpers = {
        installed: true,
        functions: [
          'findByTextRobust', 'analyzeScriptsRobust', 'extractPatternsRobust',
          'extractStorageDataRobust', 'detectValueType'
        ]
      };

      console.log('✅ CONTENT: Helpers corregidos v3.1.1 instalados');
      
    } catch (error) {
      console.error('❌ CONTENT: Error instalando helpers:', error);
      this.preAnalysisData.helpers.error = error.message;
    }
  }

  // ANÁLISIS ROBUSTO INICIAL CORREGIDO
  performRobustAnalysis() {
    console.log('⚡ CONTENT: Realizando análisis robusto v3.1.1...');
    
    try {
      this.preAnalysisData.robustAnalysis = {
        timestamp: Date.now(),
        success: true,
        
        // Contadores básicos con manejo de errores
        metrics: this.calculateBasicMetrics(),
        
        // Detección de funcionalidad robusta
        features: this.detectFeatures(),
        
        // Frameworks con validación mejorada
        frameworks: this.detectFrameworksRobust(),
        
        // Análisis de rendimiento
        performance: this.analyzePerformance(),
        
        // Meta información robusta
        metadata: this.extractMetadata()
      };
      
      console.log('✅ CONTENT: Análisis robusto v3.1.1 completado exitosamente');
      
    } catch (error) {
      console.error('❌ CONTENT: Error en análisis robusto:', error);
      this.preAnalysisData.robustAnalysis = {
        timestamp: Date.now(),
        success: false,
        error: error.message,
        partialResults: this.getPartialResults()
      };
    }
  }

  // CALCULAR MÉTRICAS BÁSICAS ROBUSTAMENTE
  calculateBasicMetrics() {
    try {
      return {
        elements: document.querySelectorAll('*').length,
        scripts: document.querySelectorAll('script').length,
        forms: document.querySelectorAll('form').length,
        buttons: document.querySelectorAll('button, [role="button"], input[type="submit"]').length,
        inputs: document.querySelectorAll('input, textarea').length,
        links: document.querySelectorAll('a[href]').length,
        images: document.querySelectorAll('img').length,
        iframes: document.querySelectorAll('iframe').length
      };
    } catch (error) {
      return { error: error.message };
    }
  }

  // DETECTAR CARACTERÍSTICAS ROBUSTAMENTE
  detectFeatures() {
    try {
      return {
        hasAuth: this.detectAuthFeatures(),
        hasGeneration: this.detectGenerationFeatures(),
        hasAPI: this.detectAPIFeatures(),
        hasRealTime: this.detectRealTimeFeatures(),
        hasFileUpload: this.detectFileUploadFeatures(),
        hasDataTables: this.detectDataTableFeatures()
      };
    } catch (error) {
      return { error: error.message };
    }
  }

  detectAuthFeatures() {
    try {
      return !!(
        document.querySelector('input[type="password"]') ||
        document.querySelector('[data-testid*="login"], [data-testid*="auth"]') ||
        document.querySelector('[class*="login"], [class*="auth"]') ||
        (window.findByTextRobust && window.findByTextRobust('login').count > 0) ||
        /login|signin|auth/i.test(document.title + document.body.textContent.substring(0, 1000))
      );
    } catch (error) {
      return false;
    }
  }

  detectGenerationFeatures() {
    try {
      return !!(
        document.querySelector('[placeholder*="prompt"], [placeholder*="message"]') ||
        document.querySelector('[placeholder*="generate"], [placeholder*="create"]') ||
        (window.findByTextRobust && window.findByTextRobust('generate').count > 0) ||
        /generate|create|ai|gpt|gemini/i.test(document.title + window.location.href)
      );
    } catch (error) {
      return false;
    }
  }

  detectAPIFeatures() {
    try {
      return !!(
        document.querySelector('[data-api], [data-endpoint]') ||
        Array.from(document.querySelectorAll('script')).some(script => 
          /fetch\(|axios\.|api\.|\.then\(|\.catch\(/i.test(script.innerHTML)
        ) ||
        /api|endpoint/i.test(window.location.href)
      );
    } catch (error) {
      return false;
    }
  }

  detectRealTimeFeatures() {
    try {
      return !!(
        window.WebSocket ||
        window.EventSource ||
        document.querySelector('[data-realtime], [data-live]') ||
        /socket|realtime|live|streaming/i.test(document.body.innerHTML.substring(0, 2000))
      );
    } catch (error) {
      return false;
    }
  }

  detectFileUploadFeatures() {
    try {
      return !!(
        document.querySelector('input[type="file"]') ||
        document.querySelector('[accept*="image"], [accept*="file"]') ||
        document.querySelector('.upload, .file-upload') ||
        /upload|attach|file/i.test(document.body.textContent.substring(0, 1000))
      );
    } catch (error) {
      return false;
    }
  }

  detectDataTableFeatures() {
    try {
      return !!(
        document.querySelector('table') ||
        document.querySelector('[role="grid"], [role="table"]') ||
        document.querySelector('.table, .data-table') ||
        document.querySelectorAll('tr').length > 5
      );
    } catch (error) {
      return false;
    }
  }

  // DETECTAR FRAMEWORKS ROBUSTAMENTE CORREGIDO
  detectFrameworksRobust() {
    try {
      const frameworks = {};
      
      // React
      try {
        frameworks.react = !!(
          window.React || 
          document.querySelector('[data-reactroot]') || 
          document.querySelector('[data-react-helmet]') ||
          document.querySelector('[class*="react"]') ||
          document.querySelector('#root, #react-root')
        );
      } catch (e) { frameworks.react = false; }
      
      // Angular
      try {
        frameworks.angular = !!(
          window.angular || 
          window.ng ||
          document.querySelector('[ng-app]') || 
          document.querySelector('[ng-controller]') ||
          document.querySelector('[class*="ng-"]') ||
          document.querySelector('app-root')
        );
      } catch (e) { frameworks.angular = false; }
      
      // Vue
      try {
        frameworks.vue = !!(
          window.Vue || 
          document.querySelector('[data-v-]') || 
          document.querySelector('[v-]') ||
          document.querySelector('#app[data-v-]') ||
          document.querySelector('.vue-container')
        );
      } catch (e) { frameworks.vue = false; }
      
      // Otros frameworks
      try {
        frameworks.jquery = !!(window.jQuery || window.$);
        frameworks.lodash = !!(window._ && typeof window._.VERSION === 'string');
        frameworks.moment = !!window.moment;
        frameworks.axios = !!window.axios;
        frameworks.bootstrap = !!(
          document.querySelector('[class*="bootstrap"]') ||
          document.querySelector('.btn, .container, .row')
        );
        frameworks.tailwind = !!(
          document.querySelector('[class*="tw-"]') ||
          document.querySelector('[class*="text-"]') ||
          document.querySelector('[class*="bg-"]')
        );
      } catch (e) {
        frameworks.jquery = false;
        frameworks.lodash = false;
        frameworks.moment = false;
        frameworks.axios = false;
        frameworks.bootstrap = false;
        frameworks.tailwind = false;
      }
      
      return frameworks;
    } catch (error) {
      return { error: error.message };
    }
  }

  // ANALIZAR RENDIMIENTO CORREGIDO
  analyzePerformance() {
    try {
      const performanceData = {
        memoryUsage: null,
        timing: null,
        navigation: null,
        resources: null
      };

      // Memoria
      if (performance.memory) {
        performanceData.memoryUsage = {
          used: Math.round(performance.memory.usedJSHeapSize / 1024 / 1024),
          total: Math.round(performance.memory.totalJSHeapSize / 1024 / 1024),
          limit: Math.round(performance.memory.jsHeapSizeLimit / 1024 / 1024)
        };
      }

      // Timing
      if (performance.timing) {
        performanceData.timing = {
          domLoading: performance.timing.domLoading,
          domComplete: performance.timing.domComplete,
          loadEventEnd: performance.timing.loadEventEnd,
          responseStart: performance.timing.responseStart,
          responseEnd: performance.timing.responseEnd
        };
      }

      // Navegación
      if (performance.navigation) {
        performanceData.navigation = {
          type: performance.navigation.type,
          redirectCount: performance.navigation.redirectCount
        };
      }

      // Recursos
      try {
        const resources = performance.getEntriesByType('resource');
        performanceData.resources = {
          total: resources.length,
          scripts: resources.filter(r => r.name.includes('.js')).length,
          styles: resources.filter(r => r.name.includes('.css')).length,
          images: resources.filter(r => /\.(png|jpg|jpeg|gif|svg|webp)/.test(r.name)).length
        };
      } catch (resourceError) {
        performanceData.resources = { error: resourceError.message };
      }

      return performanceData;
    } catch (error) {
      return { error: error.message };
    }
  }

  // EXTRAER METADATA CORREGIDA
  extractMetadata() {
    try {
      return {
        title: document.title,
        url: window.location.href,
        domain: window.location.hostname,
        protocol: window.location.protocol,
        pathname: window.location.pathname,
        search: window.location.search,
        userAgent: navigator.userAgent,
        language: navigator.language,
        languages: navigator.languages || [],
        platform: navigator.platform,
        cookieEnabled: navigator.cookieEnabled,
        onLine: navigator.onLine,
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight,
          devicePixelRatio: window.devicePixelRatio || 1
        },
        screen: {
          width: screen.width,
          height: screen.height,
          availWidth: screen.availWidth,
          availHeight: screen.availHeight,
          colorDepth: screen.colorDepth
        },
        connection: navigator.connection ? {
          effectiveType: navigator.connection.effectiveType,
          downlink: navigator.connection.downlink,
          rtt: navigator.connection.rtt
        } : null,
        battery: navigator.getBattery ? 'supported' : 'not_supported'
      };
    } catch (error) {
      return { error: error.message };
    }
  }

  // OBTENER RESULTADOS PARCIALES EN CASO DE ERROR
  getPartialResults() {
    try {
      return {
        basicCount: document.querySelectorAll('*').length,
        hasBody: !!document.body,
        hasHead: !!document.head,
        readyState: document.readyState,
        url: window.location.href,
        title: document.title || 'No title'
      };
    } catch (error) {
      return { criticalError: error.message };
    }
  }

  // CONFIGURAR OBSERVADORES MEJORADOS Y CORREGIDOS
  setupImprovedObservers() {
    console.log('👀 CONTENT: Configurando observadores mejorados v3.1.1...');
    
    try {
      // Observer DOM mejorado con throttling
      let observerTimeout = null;
      this.domObserver = new MutationObserver((mutations) => {
        try {
          clearTimeout(observerTimeout);
          observerTimeout = setTimeout(() => {
            let significantChanges = false;
            
            mutations.forEach((mutation) => {
              try {
                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                  for (let node of mutation.addedNodes) {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                      if (['SCRIPT', 'FORM', 'BUTTON', 'INPUT', 'IFRAME'].includes(node.tagName) ||
                          node.querySelector('script, form, button, input') ||
                          this.hasImportantDataAttributes(node)) {
                        significantChanges = true;
                        break;
                      }
                    }
                  }
                }
              } catch (mutationError) {
                console.error('Error procesando mutación:', mutationError);
              }
            });
            
            if (significantChanges) {
              console.log('🔄 CONTENT: Cambios detectados, actualizando...');
              this.performRobustAnalysis();
            }
          }, 1000);
        } catch (observerError) {
          console.error('Error en observer callback:', observerError);
        }
      });
      
      if (document.body) {
        this.domObserver.observe(document.body, {
          childList: true,
          subtree: true,
          attributes: true,
          attributeFilter: ['data-testid', 'data-automation-id', 'class', 'id', 'data-api']
        });
      }
      
      // Otros observadores
      this.setupStorageObserver();
      this.setupPerformanceObserver();
      
      console.log('✅ CONTENT: Observadores configurados');
      
    } catch (error) {
      console.error('❌ CONTENT: Error configurando observadores:', error);
    }
  }

  hasImportantDataAttributes(element) {
    try {
      const importantAttrs = [
        'data-testid', 'data-automation-id', 'data-api', 'data-token', 'data-auth',
        'data-cy', 'data-test', 'data-selenium', 'aria-label'
      ];
      return importantAttrs.some(attr => element.hasAttribute && element.hasAttribute(attr));
    } catch (error) {
      return false;
    }
  }

  setupStorageObserver() {
    try {
      window.addEventListener('storage', (e) => {
        try {
          if (e.key && /token|key|auth|session/i.test(e.key)) {
            console.log('💾 CONTENT: Cambio importante en storage:', e.key);
            setTimeout(() => this.performRobustAnalysis(), 500);
          }
        } catch (storageError) {
          console.error('Error en storage observer:', storageError);
        }
      });
    } catch (error) {
      console.error('Error setting up storage observer:', error);
    }
  }

  setupPerformanceObserver() {
    try {
      if (window.PerformanceObserver) {
        const observer = new PerformanceObserver((list) => {
          try {
            const entries = list.getEntries();
            entries.forEach(entry => {
              try {
                if (entry.entryType === 'resource' && entry.name.includes('api')) {
                  console.log('🔗 CONTENT: API call detected:', entry.name);
                }
              } catch (entryError) {
                // Ignorar errores individuales de entries
              }
            });
          } catch (listError) {
            console.error('Error processing performance entries:', listError);
          }
        });
        
        try {
          observer.observe({ entryTypes: ['resource', 'navigation'] });
        } catch (observeError) {
          console.error('Error starting performance observer:', observeError);
        }
      }
    } catch (error) {
      console.error('Error setting up performance observer:', error);
    }
  }

  // NOTIFICAR AL BACKGROUND CON MÉTRICAS
  notifyBackgroundWithMetrics() {
    try {
      if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.sendMessage) {
        chrome.runtime.sendMessage({
          action: 'contentPreAnalysisReady_v3.1.1',
          data: this.preAnalysisData,
          timestamp: Date.now(),
          version: '3.1.1'
        }).catch(error => {
          console.log('📝 CONTENT: Background no accesible (normal)');
        });
      } else {
        console.log('📝 CONTENT: Chrome runtime no disponible');
      }
      
      console.log('📡 CONTENT: Notificación completada');
      
    } catch (error) {
      console.log('📝 CONTENT: Background no accesible:', error.message);
    }
  }

  // MÉTODOS DE ACCESO
  getPreAnalysisData() {
    return this.preAnalysisData;
  }

  cleanup() {
    try {
      if (this.domObserver) {
        this.domObserver.disconnect();
      }
      console.log('🧹 CONTENT: Cleanup completado');
    } catch (error) {
      console.error('Error en cleanup:', error);
    }
  }
}

// INICIALIZAR PRE-ANALYZER MEJORADO
let preAnalyzer;

function initializeEnhancedContentScript() {
  console.log('🚀 CONTENT: Inicializando script v3.1.1...');
  
  try {
    preAnalyzer = new ContentPreAnalyzer();
    
    // Interfaz global mejorada
    window.__WebScrapingIntelligence__ = {
      version: '3.1.1',
      improvements: ['robustParsing', 'parallelization', 'autoRecovery', 'tripleAI'],
      preAnalyzer: preAnalyzer,
      getAnalysisData: () => preAnalyzer.getPreAnalysisData(),
      helpers: {
        findByTextRobust: window.findByTextRobust,
        analyzeScriptsRobust: window.analyzeScriptsRobust,
        extractStorageDataRobust: window.extractStorageDataRobust
      },
      status: 'ready'
    };
    
    console.log('✅ CONTENT: Script v3.1.1 inicializado correctamente');
    
  } catch (error) {
    console.error('❌ CONTENT: Error inicializando script v3.1.1:', error);
    
    window.__WebScrapingIntelligence__ = {
      version: '3.1.1',
      status: 'error',
      error: error.message,
      fallback: true
    };
  }
}

// INICIALIZAR CUANDO DOM ESTÉ LISTO
(function() {
  try {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initializeEnhancedContentScript);
    } else {
      initializeEnhancedContentScript();
    }
  } catch (error) {
    console.error('❌ CONTENT: Error crítico en inicialización:', error);
  }
})();

// CLEANUP AL SALIR
window.addEventListener('beforeunload', () => {
  try {
    if (preAnalyzer && preAnalyzer.cleanup) {
      preAnalyzer.cleanup();
    }
  } catch (error) {
    console.error('Error en cleanup:', error);
  }
});

console.log('✅ CONTENT: Script v3.1.1 cargado correctamente');